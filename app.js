// Import required modules
const express = require("express"); // Framework for building web applications
const bodyParser = require("body-parser"); // Middleware to parse request body
const mongoose = require("mongoose"); // ORM for MongoDB
const _ = require("lodash"); // Utility library for string manipulation and other helpers

// Create an Express app
const app = express();

// Set the view engine to EJS for rendering dynamic HTML pages
app.set("view engine", "ejs");

// Middleware to parse URL-encoded request bodies (e.g., form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like CSS, images) from the "public" folder
app.use(express.static("public"));

// Connect to the MongoDB database named "todolistDB"
mongoose.connect("mongodb://localhost:27017/todolistDB");

// Define a schema for items (individual tasks)
const itemsSchema = {
  name: String // Each item has a "name" of type String
};

// Create a Mongoose model for the items collection
const Item = mongoose.model("Item", itemsSchema);

// Create three default items to display initially
const item1 = new Item({
  name: "Welcome to your To-Do List!"
});
const item2 = new Item({
  name: "Hit the + button to add new item."
});
const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

// Store the default items in an array for easy reuse
const defaultItems = [item1, item2, item3];

// Define a schema for custom lists (e.g., work list, shopping list)
const listSchema = {
  name: String, // The name of the custom list
  items: [itemsSchema] // An array of items following the items schema
};

// Create a Mongoose model for the lists collection
const List = mongoose.model("List", listSchema);

// Handle GET requests to the root route "/"
app.get("/", function (req, res) {
  // Fetch all items from the "items" collection
  Item.find({})
    .then((items) => {
      if (items.length === 0) {
        // If the collection is empty, insert the default items
        return Item.insertMany(defaultItems)
          .then(() => {
            console.log("Items added successfully");
            // Fetch the updated list of items after insertion
            return Item.find({});
          })
          .catch((err) => {
            console.error("There is an error saving items.", err);
            throw err; // Propagate the error
          });
      } else {
        // If items already exist, return them directly
        return items;
      }
    })
    .then((items) => {
      // Render the "list" view, passing the current items and "Today" as the title
      res.render("list", { checkDay: "Today", nextItem: items });
    })
    .catch((err) => console.error("Error during database operations.", err));
});

// Handle POST requests to add a new item
app.post("/", function (req, res) {
  const newerItem = req.body.newItem; // Get the new item's name from the request body
  const listName = req.body.list; // Get the list name from the request body

  // Create a new item object
  const nextItem = new Item({
    name: newerItem
  });

  if (listName === "Today") {
    // If the item belongs to the "Today" list, save it to the "items" collection
    nextItem.save();
    res.redirect("/"); // Redirect to the root route to display updated items
  } else {
    // Find the custom list by name and add the new item to its items array
    List.findOne({ name: listName })
      .then((foundList) => {
        foundList.items.push(nextItem); // Add the new item to the list
        foundList.save(); // Save the updated list
        res.redirect("/" + listName); // Redirect to the custom list
      })
      .catch((err) => console.error(err));
  }
});

// Handle POST requests to delete an item
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox; // Get the ID of the item to delete
  const listName = req.body.listName; // Get the list name from the request body

  if (listName === "Today") {
    // If the item is in the "Today" list, delete it from the "items" collection
    Item.findByIdAndDelete(checkedItemId)
      .then(() => console.log("Item removed successfully"))
      .catch((err) => console.error("Error removing item", err));
    res.redirect("/"); // Redirect to the root route
  } else {
    // If the item belongs to a custom list, remove it using `$pull`
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } } // Remove the item by its ID
    )
      .then(() => {
        res.redirect("/" + listName); // Redirect to the custom list
      })
      .catch((err) => console.error(err));
  }
});

// Handle GET requests to custom list routes (e.g., "/Work", "/Shopping")
app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName); // Capitalize the custom list name

  // Check if the custom list exists in the database
  List.findOne({ name: customListName })
    .then((foundList) => {
      if (!foundList) {
        // If the list doesn't exist, create a new list with default items
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save(); // Save the new list
        res.redirect("/" + customListName); // Redirect to the new list
      } else {
        // If the list exists, render it with its items
        res.render("list", { checkDay: foundList.name, nextItem: foundList.items });
      }
    })
    .catch((err) => {
      console.error("Error finding the list:", err);
    });
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

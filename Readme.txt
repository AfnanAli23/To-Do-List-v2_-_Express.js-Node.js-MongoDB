# To-Do List Application

## Description
This is a **To-Do List Application** built with **Node.js**, **Express.js**, **MongoDB**, and **EJS templates**. The application allows users to manage their daily tasks through a simple and intuitive web interface. Users can add, delete, and organize their tasks into custom lists. The app leverages MongoDB for data storage, EJS for rendering dynamic content, and Express.js as the backend framework.

---

## Features
1. **Default Task List:**
   - The app includes a default "Today" list populated with introductory tasks.
   - Users can view, add, and delete tasks from the "Today" list.

2. **Custom Lists:**
   - Users can create custom task lists by entering a unique list name in the URL (e.g., `/Work`, `/Shopping`).
   - Each custom list is stored in the database and can have its own tasks.

3. **Add New Tasks:**
   - Add tasks to the "Today" list or any custom list via the input form.

4. **Delete Tasks:**
   - Easily delete tasks by clicking the checkbox next to them.

5. **Persistent Data Storage:**
   - Tasks and custom lists are stored in **MongoDB**, ensuring data is preserved even after the server restarts.

6. **Dynamic User Interface:**
   - Built using **EJS templates**, which allow dynamic rendering of task data on the frontend.

---

## Technologies Used
1. **Backend:**
   - **Node.js**: JavaScript runtime for server-side scripting.
   - **Express.js**: Web framework for building the server and handling routes.
   - **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
2. **Database:**
   - **MongoDB**: NoSQL database used for storing tasks and custom lists.
3. **Frontend:**
   - **EJS**: Template engine for rendering dynamic HTML.
   - **CSS & Static Files**: Used for styling and enhancing the UI.
4. **Utilities:**
   - **Lodash**: Used for string manipulations and utility functions.

---

## Project Structure
### Main Files and Folders
- **`app.js`**: The main server-side application logic, including routes and database interaction.
- **`views/`**: Contains EJS templates for rendering the UI.
  - `list.ejs`: Template for displaying the task list.
  - `header.ejs` & `footer.ejs`: Common components included in the layout.
- **`public/`**: Contains static files (CSS, images, etc.) for styling and design.
- **`node_modules/`**: Dependencies installed via npm.

---

## How It Works
### Application Flow
1. **Home Page (`/`):**
   - When the app is accessed, the server checks the MongoDB database for tasks in the "Today" list.
   - If the list is empty, it inserts default tasks into the database.
   - The tasks are dynamically rendered using the `list.ejs` template.

2. **Adding a Task:**
   - Users enter a task in the input field and click the "+" button.
   - The app saves the task to the "Today" list or the relevant custom list in MongoDB.
   - The page reloads to display the updated list of tasks.

3. **Deleting a Task:**
   - When a user clicks the checkbox next to a task, the app identifies the task's ID.
   - It deletes the task from the database and reloads the page.

4. **Custom Lists:**
   - Users can create or access custom lists by navigating to a URL like `/Work` or `/Shopping`.
   - If the custom list doesn't exist, it is created with the default tasks.
   - Tasks in custom lists can be managed just like the "Today" list.

---

## Code Breakdown
### `app.js` Overview
- **Dependencies:**
  - Imports `express`, `body-parser`, `mongoose`, and `lodash`.
  - Sets up the app to use EJS as the view engine and `body-parser` for parsing form data.

- **Database Connection:**
  - Connects to a MongoDB database named `todolistDB`.

- **Schemas and Models:**
  - Defines an `itemsSchema` for individual tasks and a `listSchema` for custom lists.
  - Creates Mongoose models (`Item` and `List`) to interact with the database.

- **Routes:**
  - **`GET /`**: Retrieves tasks from the "Today" list and renders them on the homepage.
  - **`POST /`**: Adds a new task to the "Today" list or a custom list.
  - **`POST /delete`**: Deletes a task from the database.
  - **`GET /:customListName`**: Handles custom lists by retrieving or creating them as needed.

- **Server Initialization:**
  - Starts the server on port 3000 and logs a confirmation message.

---

## How to Run the Application
1. **Install Node.js and MongoDB** on your system.
2. Clone the repository to your local machine.
3. Navigate to the project folder in your terminal.
4. Run `npm install` to install the required dependencies.
5. Start MongoDB:
   - On Linux: Run `mongod` in a separate terminal.
   - On Windows: Start the MongoDB service.
6. Run the server:
   ```bash
   node app.js
   ```
7. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## Example Usage
1. Access the "Today" list at the root route (`/`).
2. Create a custom list by appending the list name to the URL (e.g., `/Work`).
3. Add tasks using the input form.
4. Delete tasks by checking the checkbox next to them.

---

## Future Enhancements
1. User authentication to provide personal task lists.
2. Implementing a deadline feature for tasks.
3. Adding a priority level to tasks.
4. Enhancing UI with additional styling or animations.

---

This To-Do List app is a great starting point for learning full-stack web development and understanding CRUD operations with MongoDB.
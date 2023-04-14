# Project Name
To-Do List Web Application

# Description
This is a web application that enables users to manage their tasks using a To-Do list. .\
The application is built with React on the front-end and Node.js and MySQL on the back-end..\
It is designed to be a single-page web application that calls APIs to perform all the necessary operations. .\
The application is public and does not require authentication or authorization. .\
All business logic exists on the API side, and the front-end communicates with the back-end to fetch and update data.

# Installation
To run this application on your local machine, you need to have Node.js, npm (Node Package Manager) and MySql installed. .\
Follow the steps below to get started:

# Clone the repository from GitHub to your local machine.
   Navigate to the project directory in your terminal.
### npm install 
  Install the necessary dependencies..\
  Create a MySQL database..\
  Configure database connection details in db.js (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) and port number (3001) in index.js.
### node index.js
  Run node index.js in back-end directory to start the development server
### npm run start
  Run npm run start in front-end directory to start the front-end application 

# User Interface
The UI is designed to be simple and user-friendly..\
The tab displays two columns: To-Do and Done..\
The To-Do list is unlimited, and the Done list displays the 10 most recently completed tasks..\
Both lists are alphabetically sorted, and tasks can be checked and unchecked to appear in the corresponding column..\
Users can add a task one time to the To-Do list..\
If user check a task on the To-Do list, it will be moved to the Done list.\
If user check a task on the Done list, it will be deleted..\
Users can delete all tasks after confirmation..\
The search box allows users to filter both columns to display only items matching the text entered..\
![image](https://user-images.githubusercontent.com/121654126/232080979-7b550f9f-bb5e-4d17-8fc8-8cac8895471b.png).

# Backend API
All the columns' content is stored on the back-end, and the front-end communicates with the API to perform CRUD operations..\ 
The API's business logic is responsible for managing the To-Do and Done columns. .\
the front-end is responsible for displaying the data and accepting user input. .\
The API uses RESTful endpoints to retrieve, add, update, and delete data..\

# Technologies
React.\
Node.js.\
MySQL.\
CSS



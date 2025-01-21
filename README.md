# To-Do List

A simple and interactive To-Do List web application that allows users to add, delete, and mark tasks as completed. The app stores tasks locally using the browser's `localStorage`, making it persistent even after refreshing the page. It also provides the option to filter tasks based on their completion status (All, Completed, Active). 

## Features

- Add new tasks with a text input.
- Mark tasks as completed or active.
- Delete tasks.
- Filter tasks by their completion status: All, Completed, or Active.
- Date input to set a due date for tasks.
- Automatically adjust the textarea height based on the content of the task.
- Data is saved in the browser’s `localStorage`, ensuring tasks persist between page refreshes.

## Technologies Used

- **<i class="fab fa-html5"></i> HTML5**: For the structure of the page.
- **<i class="fab fa-css3-alt"></i> CSS3**: For styling the application, with a responsive design.
- **<i class="fab fa-js-square"></i> JavaScript**: For interactivity (task management, filtering, localStorage).
- **<i class="fab fa-font-awesome"></i> Font Awesome**: For icons (check and delete task icons).
- **<i class="fab fa-node-js"></i> Express.js**: For the backend API to manage tasks (optional based on server-side setup).
- **<i class="fab fa-html5"></i> LocalStorage**: For storing tasks in the browser.
- **<i class="fab fa-node-js"></i> Node.js**: For running the backend server.
- **<i class="fab fa-render"></i> Render**: For deploying the application online.


## Installation

### Frontend (Client-side)

1. Clone the repository:
   git clone https://github.com/yourusername/todo-list.git
   
2. Navigate to the project folder:
cd todo-list

3. Open the index.html file in your browser.

### Backend (Optional - Express.js server)
If you want to use a backend server for task management:
1. Ensure that you have Node.js installed. You can check by running:
node -v
2. Install dependencies
   npm install
3. start the server
   npm start
4. The server will be available at http://localhost:3001.

This setup allows for storing tasks on the server instead of using localStorage, and it provides a RESTful API for task management.

Backend (Optional - Express.js server)
If you want to use a backend server for task management:

Ensure that you have Node.js installed. You can check by running:



Deployment on Render
To deploy this app using Render:

Push your code to a GitHub repository.
Sign up or log in to Render.
Create a new Web Service and link it to your GitHub repository.
Choose Node.js as the environment and configure the build and start commands:
Build Command: npm install
Start Command: npm start
Click Create Web Service and Render will automatically deploy the app.
After deployment, your app will be accessible via a public URL provided by Render.

### File Structure 
├── public
│   
├── index.html       # The main HTML file
│   ├── style.css       # The CSS file for styling
│   ├── app.js          # The main JavaScript file for interactivity
│   ├── background.jpg  # Background image for the page
│   └── HeadImage.png    # Image for the heading
├── server.js           # Express.js server for task API (optional)
├── package.json        # Node.js project dependencies (optional)
└── README.md           # This file

### Usage 
Adding Tasks
Type your task in the input field and click the "Submit" button.
The task will be added to the list and saved in localStorage.

Marking Tasks as Complete
Click the "check" icon next to a task to mark it as completed.
The task text will be struck through to indicate completion.

Deleting Tasks
Click the "trash" icon next to a task to delete it from the list.

Filtering Tasks
Use the filter dropdown to view tasks based on their status: "All", "Completed", or "Active".

Date Input
Set a custom date for your tasks via the date input field at the top of the page. This will be saved in localStorage and reloaded on page refresh.

### Contributing
If you want to contribute to this project:

1.Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push to your branch (git push origin feature-branch).
5. Open a pull request.




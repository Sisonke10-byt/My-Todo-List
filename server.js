// server.js
const express = require('express');
const app = express();
const path = require('path');

// Set up middleware
app.use(express.json()); // For parsing application/json
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// In-memory storage for tasks (simple placeholder)
let tasks = [];

// API: Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// API: Add a task
app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  const newTask = { text, completed: false, dueDate: null };
  tasks.push(newTask);
  res.status(201).json(newTask); // Send back the added task
});

// API: Delete a task
app.delete('/api/tasks/:index', (req, res) => {
  const { index } = req.params;
  tasks.splice(index, 1); // Remove task by index
  res.status(204).end(); // No content response for successful delete
});

// API: Update task completion
app.patch('/api/tasks/:index', (req, res) => {
  const { index } = req.params;
  const task = tasks[index];
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Set up the server to listen on port 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




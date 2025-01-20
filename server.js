const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

let tasks = []; // Store tasks in-memory

app.use(express.json()); // Middleware to parse JSON

// Serve static files
app.use(express.static('public'));

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const { text, completed = false, dueDate = null } = req.body;
  tasks.push({ text, completed, dueDate });
  res.status(201).json({ message: 'Task added successfully' });
});

// Delete a task by index
app.delete('/api/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Toggle task completion
app.patch('/api/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = !tasks[index].completed;
    res.json({ message: 'Task completion toggled successfully' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

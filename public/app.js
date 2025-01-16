// Fetch tasks from LocalStorage
const fetchTasks = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

// Save tasks to LocalStorage
const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add a task
const addTask = (taskText) => {
  const tasks = fetchTasks();
  tasks.push({ text: taskText, completed: false, dueDate: null });
  saveTasks(tasks);
  renderTasks();
};

// Remove a task
const removeTask = (index) => {
  const tasks = fetchTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
};

// Toggle task completion
const toggleTaskCompletion = (index) => {
  const tasks = fetchTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
};

// Render tasks with filtering
const renderTasks = () => {
  const tasks = fetchTasks();
  const filter = document.getElementById('filter-tasks').value;

  // Filter tasks based on dropdown selection
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    if (filter === 'due-date') return !!task.dueDate;
    return true; // Default to 'all'
  });

  // Render tasks in the list
  const taskContainer = document.querySelector('.toDoList');
  taskContainer.innerHTML = filteredTasks
    .map(
      (task, index) => `
        <li class="task">
          <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">
            ${task.text}
          </span>
          <button class="complete" onclick="toggleTaskCompletion(${index})">Toggle</button>
          <button class="delete" onclick="removeTask(${index})">Delete</button>
        </li>
      `
    )
    .join('');
};

// Event listener for adding a task
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission
  const taskInput = document.getElementById('todo');
  const task = taskInput.value.trim();
  if (task) {
    addTask(task); // Add the task
    taskInput.value = ''; // Clear the input field
  }
});

// Event listener for filtering tasks
document.getElementById('filter-tasks').addEventListener('change', renderTasks);

// Initial render
renderTasks();

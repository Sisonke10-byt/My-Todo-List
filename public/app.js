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
  tasks.push({ text: taskText, completed: false });
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

// Render tasks
const renderTasks = () => {
  const tasks = fetchTasks();
  const taskContainer = document.querySelector('.toDoList');
  taskContainer.innerHTML = tasks
    .map(
      (task, index) => `
        <li class="task">
          <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">
            ${task.text}
          </span>
          <button class="button complete" onclick="toggleTaskCompletion(${index})">Complete</button>
          <button class="button delete" onclick="removeTask(${index})">Delete</button>
        </li>
      `
    )
    .join('');
};

// Event listener for the form submission
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.querySelector('.form__input');
  const task = taskInput.value.trim();
  if (task) {
    addTask(task);
    taskInput.value = ''; // Clear input after adding the task
  }
});

// Initial render
renderTasks();

    
  
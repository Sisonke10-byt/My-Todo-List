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
    const taskContainer = document.getElementById('tasks');
    taskContainer.innerHTML = tasks
      .map(
        (task, index) => `
          <div class="task">
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">
              ${task.text}
            </span>
            <button class="complete" onclick="toggleTaskCompletion(${index})">Toggle</button>
            <button class="delete" onclick="removeTask(${index})">Delete</button>
          </div>
        `
      )
      .join('');
  };
  
  // Event listener for adding a task
  document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    if (task) {
      addTask(task);
      taskInput.value = '';
    }
  });
  
  // Initial render
  renderTasks();
    
  
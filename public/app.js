// Fetch tasks from LocalStorage
const fetchTasks = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

// Save tasks to LocalStorage
const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Render tasks with drag-and-drop functionality
const renderTasks = () => {
  const tasks = fetchTasks();
  const filter = document.getElementById('filter-tasks').value;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true; // Default to 'all'
  });

  const taskContainer = document.querySelector('.toDoList');
  taskContainer.innerHTML = filteredTasks
    .map(
      (task, index) => `
        <li class="task" draggable="true" ondragstart="handleDragStart(event, ${index})" ondragover="handleDragOver(event)" ondrop="handleDrop(event, ${index})">
          <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">
            ${task.text}
          </span>
          <button class="icon-button complete" onclick="toggleTaskCompletion(${index})" title="Mark as Complete">
            <i class="fas fa-check"></i>
          </button>
          <button class="icon-button delete" onclick="removeTask(${index})" title="Delete Task">
            <i class="fas fa-trash"></i>
          </button>
          <button class="icon-button edit" onclick="enableInlineEditing(${index})" title="Edit Task">
            <i class="fas fa-edit"></i>
          </button>
        </li>
      `
    )
    .join('');
};

// Drag-and-drop functions
let draggedTaskIndex = null;

// Handle drag start
const handleDragStart = (event, index) => {
  draggedTaskIndex = index;
  event.dataTransfer.effectAllowed = 'move';
};

// Prevent default behavior for dragover
const handleDragOver = (event) => {
  event.preventDefault();
};

// Handle drop and reorder tasks
const handleDrop = (event, dropIndex) => {
  event.preventDefault();
  const tasks = fetchTasks();

  // Reorder tasks
  const draggedTask = tasks[draggedTaskIndex];
  tasks.splice(draggedTaskIndex, 1);
  tasks.splice(dropIndex, 0, draggedTask);

  saveTasks(tasks);
  renderTasks();
};

// Initialize app on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeDate();
  renderTasks();
});

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

// Edit a task inline
const enableInlineEditing = (index) => {
  const tasks = fetchTasks();
  const taskContainer = document.querySelectorAll('.task')[index];
  const taskTextElement = taskContainer.querySelector('.task-text');
  const taskText = tasks[index].text;

  // Replace the span with an input field
  const input = document.createElement('input');
  input.type = 'text';
  input.value = taskText;
  input.className = 'edit-input';
  taskContainer.replaceChild(input, taskTextElement);

  input.focus();

  // Save changes on blur or Enter key
  const saveChanges = () => {
    const updatedText = input.value.trim();
    if (updatedText) {
      tasks[index].text = updatedText;
      saveTasks(tasks);
      renderTasks();
    } else {
      alert('Task cannot be empty!');
    }
  };

  input.addEventListener('blur', saveChanges);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveChanges();
  });
};

// Toggle task completion
const toggleTaskCompletion = (index) => {
  const tasks = fetchTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
};

// Event listener for adding a task (asynchronously simulating task submission)
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission
  const taskInput = document.getElementById('todo');
  const task = taskInput.value.trim();
  if (task) {
    addTask(task); // Add the task asynchronously
    taskInput.value = ''; // Clear the input field
  }
});

// Event listener for filtering tasks
document.getElementById('filter-tasks').addEventListener('change', renderTasks);

// Function to adjust textarea height automatically based on content
function adjustTextareaHeight(textarea) {
  // Reset height to auto so it shrinks when text is deleted
  textarea.style.height = 'auto';

  // Set the height to match the content
  textarea.style.height = textarea.scrollHeight + 'px';
}

// Initialize the date input with the current date
const initializeDate = () => {
  const dateInput = document.getElementById('heading-date');
  const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
  const savedDate = localStorage.getItem('headingDate');

  dateInput.value = savedDate || today;

  if (!savedDate) {
    localStorage.setItem('headingDate', today); 

  }
};

// Update localStorage when the date is changed
const handleDateChange = () => {
  const dateInput = document.getElementById('heading-date');
  localStorage.setItem('headingDate', dateInput.value);
};

// Event listener for date input changes
document.getElementById('heading-date').addEventListener('change', handleDateChange);

// Initialize the date on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeDate();
  renderTasks();
});

document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.querySelector('.typing-animation');

  // Add a listener for animationend to remove the blinking caret
  typingElement.addEventListener('animationend', () => {
    typingElement.classList.add('stop-blink'); // Add class to stop the caret
  });
});

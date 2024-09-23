// Add task when 'Add' button is clicked or Enter is pressed
function addItem() {
  const input = document.getElementById('todoInput');
  const taskText = input.value.trim();

  if (taskText === "") return; // Do nothing if input is empty

  const taskElement = document.createElement('li');
  taskElement.classList.add('task');
  taskElement.textContent = taskText;

  // Add mark complete functionality
  taskElement.addEventListener('click', () => {
      taskElement.classList.toggle('completed');
      saveTasks();
  });

  // Add delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = () => {
      deleteTask(taskElement);
      saveTasks();
  };

  taskElement.appendChild(deleteBtn);
  document.getElementById('todoList').appendChild(taskElement);

  input.value = ""; // Clear input
  saveTasks();
}

// Delete task
function deleteTask(taskElement) {
  taskElement.remove();
}

// Filter tasks
function filterTasks(filter) {
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
      switch (filter) {
          case 'all':
              task.style.display = 'flex';
              break;
          case 'completed':
              task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
              break;
          case 'active':
              task.style.display = !task.classList.contains('completed') ? 'flex' : 'none';
              break;
      }
  });
}

// Search tasks
function searchTasks() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
      task.style.display = task.textContent.toLowerCase().includes(query) ? 'flex' : 'none';
  });
}

// Clear all completed tasks
function clearCompleted() {
  const tasks = document.querySelectorAll('.completed');
  tasks.forEach(task => task.remove());
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = document.querySelectorAll('.task');
  const tasksArr = [];
  tasks.forEach(task => {
      tasksArr.push({
          text: task.firstChild.textContent,
          completed: task.classList.contains('completed')
      });
  });
  localStorage.setItem('tasks', JSON.stringify(tasksArr));
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
      savedTasks.forEach(task => {
          const taskElement = document.createElement('li');
          taskElement.classList.add('task');
          taskElement.textContent = task.text;

          if (task.completed) {
              taskElement.classList.add('completed');
          }

          // Add mark complete functionality
          taskElement.addEventListener('click', () => {
              taskElement.classList.toggle('completed');
              saveTasks();
          });

          // Add delete button
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.classList.add('delete-btn');
          deleteBtn.onclick = () => {
              deleteTask(taskElement);
              saveTasks();
          };

          taskElement.appendChild(deleteBtn);
          document.getElementById('todoList').appendChild(taskElement);
      });
  }
}

// Add event listener for Enter key
document.getElementById('todoInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      addItem();
  }
});

// Load tasks on window load
window.onload = loadTasks;

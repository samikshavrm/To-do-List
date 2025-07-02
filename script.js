let count = 0;
let todos = [];

function updateSummary() {
  const total = todos.length;
  const pending = todos.filter(todo => !todo.done).length;
  document.getElementById('summary').innerText = `Total: ${total}, Pending: ${pending}`;
}

function showMessage(msg, error = false) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = msg;
  messageEl.style.color = error ? 'red' : 'green';
  messageEl.classList.remove('hidden');
  setTimeout(() => messageEl.classList.add('hidden'), 2000);
}

function clearInput() {
  document.getElementById('todo-input').value = '';
}

function searchTodos() {
  const query = document.getElementById('search').value.toLowerCase();
  todos.forEach(todo => {
    const el = document.getElementById(todo.id);
    if (todo.text.toLowerCase().includes(query)) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
}

function addTodo() {
  const input = document.getElementById('todo-input');
  const value = input.value.trim();
  if (!value) return showMessage('Input cannot be empty.', true);

  if (todos.some(todo => todo.text === value)) return showMessage('Todo already exists!', true);

  count++;
  const id = `todo-${count}`;
  const todoObj = { id, text: value, done: false };
  todos.push(todoObj);

  const todoDiv = document.createElement('div');
  todoDiv.className = 'todo-card highlight';
  todoDiv.id = id;

  const title = document.createElement('h4');
  title.innerText = `${todos.length}. ${value}`;

  const actions = document.createElement('div');

  const editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.className = 'btn';
  editBtn.onclick = () => {
    const newText = prompt('Edit todo:', todoObj.text);
    if (newText && newText.trim()) {
      todoObj.text = newText.trim();
      const index = todos.findIndex(t => t.id === todoObj.id);
      title.innerText = `${index + 1}. ${todoObj.text}`;
    }
  };

  const doneBtn = document.createElement('button');
  doneBtn.innerText = 'Mark Done';
  doneBtn.className = 'btn';
  doneBtn.onclick = () => {
    todoObj.done = !todoObj.done;
    todoDiv.classList.toggle('done');
    doneBtn.innerText = todoObj.done ? 'Undo' : 'Mark Done';
    updateSummary();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.className = 'btn';
  deleteBtn.onclick = () => deleteTodo(id);

  actions.append(editBtn, doneBtn, deleteBtn);
  todoDiv.append(title, actions);
  document.getElementById('todos').appendChild(todoDiv);

  input.value = '';
  updateSummary();
  document.getElementById('empty-msg').style.display = 'none';
  showMessage('Quest added!');
}

function deleteTodo(id) {
  const element = document.getElementById(id);
  element.classList.add('fade-out');
  setTimeout(() => {
    element.remove();
    todos = todos.filter(todo => todo.id !== id);
    updateSummary();
    if (todos.length === 0) document.getElementById('empty-msg').style.display = 'block';
  }, 500);
}

function toggleDarkMode() {
  const body = document.body;
  const toggleBtn = document.getElementById('toggle-mode');
  body.classList.toggle('dark-mode');
  toggleBtn.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}
document.addEventListener('mousemove', (e) => {
  const trail = document.getElementById('sparkle-trail');
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${e.pageX}px`;
  sparkle.style.top = `${e.pageY}px`;
  trail.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 600);
});
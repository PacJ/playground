let todos = [];

const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');

const render = () => {

  let html = '';
  todos.forEach (({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
    <input class="checkbox" ${completed ? 'checked' : ''} id="ck-${id}" type="checkbox">
    <label for="ck-${id}">${content}</label>
    <i class="remove-todo far fa-times-circle"></i>
    </li>`
  });
  $todos.innerHTML = html;
};

const getTodos = () => {
  fetch('/todos')
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render);
};

const removeTodo = id => {
  fetch(`/todos/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

const generateId = () => todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

const addTodo = content => {
  fetch('/todos', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id: generateId(), content, completed: false})
  })
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(e));
};

const toggleCompleted = id => {
  fetch(`/todos/${id}`, { method: 'PATCH' })
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(e));
};

$todos.onchange = ({ target }) => {
  const id = target.parentNode.id;
  toggleCompleted(+id);
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;
  target.value = '';
  addTodo(content);
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;
  removeTodo(target.parentNode.id);
};

window.onload = getTodos;
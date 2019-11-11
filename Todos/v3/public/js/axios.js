let todos = [];

const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');

const render = () => {
  let html = '';
  todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
    <input class="checkbox" ${completed ? 'checked' : ''} id="ck-${id}" type="checkbox">
    <label for="ck-${id}">${content}</label>
    <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });
  $todos.innerHTML = html;
};

const getTodos = () => {
  axios.get('/todos')
    .then(res => todos = res.data)
    .then(render)
    .catch(err => console.error(err));
};

const removeTodos = id => {
  axios.delete(`/todos/${id}`)
    .then(res => todos = res.data)
    .then(render)
    .catch(err => console.error(err))
};

const generateId = () => todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

const addTodos = content => {
  axios.post(`/todos/`, { id : generateId(), content, completed: false })
    .then(res => todos = res.data)
    .then(render)
    .catch(err => console.error(err));
};

const toggleCompleted = id => {
  axios.patch(`/todos/${id}`)
    .then(res => todos = res.data)
    .then(render)
    .catch(err => console.error(err));
};

$todos.onchange = ({ target }) => {
  const id = target.parentNode.id;
  toggleCompleted(+id);
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (keyCode !== 13 || content === '') return;
  target.value = '';
  addTodos(content);
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;
  removeTodos(target.parentNode.id);
};

window.onload = getTodos;
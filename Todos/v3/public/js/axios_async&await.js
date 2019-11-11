let todos = [];
let navState = 'all';

// DOMs
const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');

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

  $completedTodos.textContent = todos.filter(todo => todo.completed).length;
  $activeTodos.textContent = todos.filter(todo => !todo.completed).length;
};

// async는 항상 await붙은 함수 앞에, await는 비동기 함수 앞에 붙힌다.
const getTodos = async () => {
  try {
    const res = await axios.get('/todos');
    todos = res.data;
    render();
  } catch(e) {
    console.error(e)
  }
};

const generateId = () => todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

const addTodo = async content => {
  try {
    const res = await axios.post('/todos', { id: generateId(), content, completed: false })
    todos = res.data;
    render();
  } catch(e) {
    console.error(e);
  }
};

const toggleTodo = async id => {
  try {
    const res = await axios.patch(`/todos/${id}`)
    todos = res.data;
    render();
  } catch(e) {
    console.error(e);
  }
};

// .then은 값을 가지고 무조건 promise를 반환한다.
const removeTodo = async id => {
  try {
    const res = await axios.delete(`/todos/${id}`)
    todos = res.data;
    render();
  } catch (e) {
    console.error(e);
  }
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;
  target.value = '';
  addTodo(content);
};

$todos.onclick = ({ target }) => {
  const id = target.parentNode.id;
  if (!target.classList.contains('remove-todo')) return;
  removeTodo(id);
};

$todos.onchange = ({ target }) => {
  const id = target.parentNode.id;
  toggleTodo(id);
};

window.onload = getTodos();

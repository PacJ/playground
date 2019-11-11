let todos = [];

// DOMs
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


const ajax = (() => {
  const req = (method, url, payload) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(payload));

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error(xhr.status, xhr.statusText));
        }
      };
    });
  };
  return {
    get(url) {
      return req('GET', url);
    },
    post(url, payload) {
      return req('POST', url, payload);
    },
    patch(url, payload) {
      return req('PATCH', url, payload);
    },
    delete(url) {
      return req('DELETE', url);
    }
  };
})();


const getTodos = () => {
  ajax.get('/todos')
    .then(res => todos = res)
    .then(render)
    .catch(err => console.error(err));
};

const generateId = () => todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

const addTodo = content => {
  ajax.post('/todos', { id: generateId(), content, completed: false })
    .then(res => todos = res)
    .then(render)
    .catch(err => console.error(err));
};

const removeTodo = id => {
  ajax.delete(`/todos/${id}`)
    .then(res => todos = res)
    .then(render)
    .catch(err => console.error(err));
};

const toggleCompleted = id => {
  ajax.patch(`/todos/${id}`)
    .then(res => todos = res)
    .then(render)
    .catch(err => console.error(err));
};

$todos.onchange = ({ target }) => {
  const id = target.parentNode.id;
  toggleCompleted(+id);
};


$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;
  removeTodo(target.parentNode.id);
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (keyCode !== 13 || content === '') return;
  target.value = '';
  addTodo(content);
};

window.onload = getTodos;
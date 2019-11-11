let todos = [];
let navState = 'all';

// DOMs
const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');
const $nav = document.querySelector('.nav');
const $completeAll = document.querySelector('.checkbox')
const $clearCompleted = document.querySelector('.clear-completed');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');

const render = () => {

  let html = '';
  // 원본 todos는 보존이 필요하므로 navState에 따라 필터링된 todos의 복사본 생성.
    // const _todos = todos.filter(({ completed }) => (navState === 'all' ?
    // true : navState === 'active' ? !completed : completed));
    // console.log(_todos, todos);

    // _todos.forEach (({ id, content, completed }) => {
    //   html += `<li id="${id}" class="todo-item">
    //   <input class="checkbox" ${completed ? 'checked' : ''} id="ck-${id}" type="checkbox">
    //   <label for="ck-${id}">${content}</label>
    //   <i class="remove-todo far fa-times-circle"></i>
    //   </li>`
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
  return req('POST', url, payload)
  },
  delete(url) {
  return req('DELETE', url)
  },
  put(url, payload) {
  return req('PUT', url, payload)
  }
};

}());


const getTodos = () => {
  axios.get('/todos')
    .then(res => todos = res.data);
    .then(render)
    .catch(err => console.error(err));
  // fetch('/todos')
  //   .then(res => res.json())
  //   .then(_todos => todos = _todos)
  //   .then(render)
  //   .catch(err => console.error(err));
};

const generateId = () => todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

const addTodo = content => {
  // ajax.post('/todos/', { id: generateId() }, render);
  fetch('/todos', {
    method: 'POST',
    headers: { 'content-type' : 'application/json' },
    body: JSON.stringify({ id: generateId(), content, completed: false })
  })
  // res.json()으로 파싱
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err))
};

// .then은 값을 가지고 무조건 promise를 반환한다.
const removeTodo = id => {
  fetch(`/todos/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;
  target.value = '';
  addTodo(content);
};


// const removeTodo id => {
//   ajax.delete(`/todos/${id}`)
// };

$todos.onclick = ({ target }) => {
  const id = target.parentNode.id;
  if (!target.classList.contains('remove-todo')) return;
  removeTodo(id);
};

$clearCompleted.onclick = () => {
  // const
  ajax.delete(`/todos/${todos.completed}`, render);
};

$todos.onchange = ({ target }) => {
  const id = target.parentNode.id;
  const completed = !todos.find(todo => todo.id === +id).completed;
  toggleCompleted(id);
};

const toggleCompleted = id => {
  todos = todos.map(todo => todo.id === +id ? { ...todo, completed: !todo.completed } : todo);
  fetch(`/todos/${id}`, { method: 'PATCH' })
    .then(_todos => todos = _todos)
    .then(render)
    .catch(err => console.error(err));
};

$completeAll.onchange = (e) => {
  console.log(e.target.checked);
  const completed = e.target.checked;
  ajax.put('/todos', { completed }, render);
};


const removeCompletedAll = () => {
  todos = todos.filter(todo => !todo.completed);
  console.log('[removeCompletedAll]', todos);
};

const changeNav = id => {
  // $navItem의 id가 e.target의 id와 같으면 active 클래스를 추가, 아니면 제거
  [...$nav.children].forEach($navItem => {
    $navItem.classList.toggle('active', $navItem.id === id);
  //   if ($navItem.id === id) {
  //     $navItem.classList.add('active');
  //   } else {
  //     $navItem.classList.remove('active');
  //   }
  // });
  });
  navState = id;
  console.log('[navState]', navState);
};

window.onload = getTodos();

// $nav.onclick = ({ target }) => {
//   if (target.classList.contains('nav')) return;
//   changeNav(target.id);
//   render();
// };


// $todos.onchange = e => {
//   toggleCompleted(e.target.parentNode.id);
//   render();
// };

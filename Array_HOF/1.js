const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function render() {
  let html = '';
  // forEach가 내부에서 콜백함수를 호출할때 인수를 3개 넣어준다. 요소값, 인덱스, this
  // 들어오는 인수의 순서대로 3개의 값을 나타낸다: 요소 값, 인덱스, this(호출한 배열)
  todos.forEach((todo) => {
    html += `<li id="${todo.id}">
  <label><input type="checkbox" ${todo.completed ? 'checked' : ''}>${todo.content}</label>
</li>`
  });

  return html;
}

console.log(render());
/*
<li id="3">
  <label><input type="checkbox">HTML</label>
</li>
<li id="2">
  <label><input type="checkbox" checked>CSS</label>
</li>
<li id="1">
  <label><input type="checkbox">Javascript</label>
</li>
*/
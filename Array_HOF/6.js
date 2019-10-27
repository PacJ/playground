// 특정 요소의 프로퍼티 값 반전
// todos에서 대상 요소의 id를 인수로 전달하면 해당 요소의 completed 프로퍼티 값을 반전하는 함수를 작성하라.

// hint) 기존 객체의 특정 프로퍼티를 변경/추가하여 새로운 객체를 생성하려면 Object.assign 또는 Spread 문법을 사용한다.

let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedById(id) {
  todos = todos.map(todo => (todo.id === id ? Object.assign(todo, { completed: !todo.completed }) : todo));
}

toggleCompletedById(2);
toggleCompletedById(3);

console.log(todos);

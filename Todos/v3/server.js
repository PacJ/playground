const express = require('express');

const app = express();

let todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'JavaScript', completed: false }
];

todos.sort((todo1, todo2) => todo2.id - todo1.id);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.post('/todos', (req, res) => {
  todos = [req.body, ...todos];
  res.send(todos);
});

app.put('/todos', (req, res) => {
  const completed = req.body.completed;
  console.log(completed);
  todos = todos.map(todo => ({ ...todo, completed }));
  res.send(todos);
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  todos = todos.map(todo => todo.id === +id ? { ...todo, completed: !todo.completed } : todo);
  res.send(todos);
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  todos = todos.filter(todo => todo.id !== +id);
  res.send(todos);
});

// app.delete('/todos/', (req, res) => {
//   const completed = req.body.completed;
//   console.log(completed);
//   todos = todos.filter(todo => completed === todo.completed);
//   res.send(todos);
// });

app.listen(2000, () => {
  console.log('Server Listening on port 2000');
});

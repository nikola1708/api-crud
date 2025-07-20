const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (untuk development)
let todos = [
  { id: 1, title: "Sample Todo", description: "This is a sample todo", completed: false },
  { id: 2, title: "Another Todo", description: "Another sample", completed: true }
];

let nextId = 3;

// Routes

// GET /todo - Get all todos
app.get('/todo', (req, res) => {
  res.json({
    success: true,
    data: todos,
    total: todos.length
  });
});

// POST /todo/add - Add new todo
app.post('/todo/add', (req, res) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }

  const newTodo = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json({
    success: true,
    data: newTodo,
    message: 'Todo created successfully'
  });
});

// PUT /todo/:id - Update todo
app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }

  // Update todo
  if (title !== undefined) todos[todoIndex].title = title.trim();
  if (description !== undefined) todos[todoIndex].description = description.trim();
  if (completed !== undefined) todos[todoIndex].completed = completed;

  res.json({
    success: true,
    data: todos[todoIndex],
    message: 'Todo updated successfully'
  });
});

// DELETE /todo/:id - Delete todo
app.delete('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];

  res.json({
    success: true,
    data: deletedTodo,
    message: 'Todo deleted successfully'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Todo API endpoints:`);
  console.log(`   GET    /todo      - Get all todos`);
  console.log(`   POST   /todo/add  - Create new todo`);
  console.log(`   PUT    /todo/:id  - Update todo`);
  console.log(`   DELETE /todo/:id  - Delete todo`);
});
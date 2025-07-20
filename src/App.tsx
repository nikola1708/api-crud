import React, { useState } from 'react';
import './App.css';
import { TodoList, Todo } from './components/todolist';
import { TodoForm } from './components/todoform';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // CREATE
  const addTodo = (title: string, description: string) => {
    setTodos([...todos, { id: Date.now(), title, description, completed: false }]);
  };

  // UPDATE
  const editTodo = (id: number, newTitle: string, newDescription: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle, description: newDescription } : todo
    ));
  };

  // TOGGLE
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // DELETE
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // STATISTICS
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const remain = total - completed;

  return (
    <div className="app-container">
      <h2>📝 Simple ToDo List</h2>
      
      <TodoForm onAdd={addTodo} loading={false}/>
      <div className="todo-stats">
        <span>Total: <b>{total}</b></span>
        <span>Completed: <b>{completed}</b></span>
        <span>Remaining: <b>{remain}</b></span>
      </div>
      <h3>Todo List</h3>
      <TodoList loading={false}
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
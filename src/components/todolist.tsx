import React from 'react';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, description: string) => void;
  loading: boolean;
}


export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editTitle, setEditTitle] = React.useState('');
  const [editDescription, setEditDescription] = React.useState('');

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const saveEdit = (id: number) => {
    if (editTitle.trim()) {
      onEdit(id, editTitle.trim(), editDescription.trim());
      setEditingId(null);
      setEditTitle('');
      setEditDescription('');
    }
  };

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={`todo-item${todo.completed ? ' completed' : ''}`}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="todo-checkbox"
          />
          {editingId === todo.id ? (
            <>
              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                placeholder="Title"
                autoFocus
                className="edit-input"
              />
              <input
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                placeholder="Description"
                className="edit-input"
              />
              <button onClick={() => saveEdit(todo.id)} className="save-btn">Save</button>
              <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
            </>
          ) : (
            <>
              <span className="todo-title">{todo.title}</span>
              <span className="todo-desc">{todo.description}</span>
              <button onClick={() => startEdit(todo)} className="edit-btn">Edit</button>
              <button onClick={() => onDelete(todo.id)} className="delete-btn">Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
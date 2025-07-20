import React, { useState } from 'react';

export interface TodoFormProps {
  onAdd: (title: string, description: string) => void;
  loading: boolean;
}


export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        style={{ marginLeft: 8 }}
      />
      <button type="submit" disabled={!title.trim()}>Add</button>
    </form>
  );
};
import React, { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const { dispatch } = useTodoContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = {
      id: Math.floor(Math.random() * 100 + 4),
      title,
      complete: false,
    };
    setTitle('');
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input type="submit" value="Submit" style={{ marginLeft: '5px' }} />
    </form>
  );
};

export default AddTodo;

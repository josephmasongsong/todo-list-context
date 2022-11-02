import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw Error('useTodoContext must be used inside a TodoContextProvider');
  }

  return context;
};

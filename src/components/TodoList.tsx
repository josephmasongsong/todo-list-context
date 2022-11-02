import { useTodoContext } from '../hooks/useTodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { state } = useTodoContext();
  const { todos } = state;
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;

import { KeyboardEvent, useState, useRef } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { Todo } from '../contexts/TodoContext';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [editable, setEditable] = useState(false);
  const [complete, setComplete] = useState(todo.complete);
  const todoRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useTodoContext();

  const handleUpdate = () => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: { ...todo, title: todoRef.current!.value },
    });
    setEditable(false);
  };

  const markComplete = () => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: { ...todo, complete: !complete },
    });
    setComplete(!complete);
  };

  const handleUpdateOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleUpdate();
    }
  };

  const todoItem = editable ? (
    <input
      type="text"
      ref={todoRef}
      defaultValue={todo.title}
      onKeyDown={handleUpdateOnKeyDown}
    />
  ) : (
    <span style={todo.complete ? { textDecoration: 'line-through' } : {}}>
      {todo.title}
    </span>
  );

  return (
    <div>
      {todoItem}
      {editable ? (
        <>
          <span
            role="img"
            aria-labelledby="cancel edit"
            style={{ marginLeft: '1rem' }}
            onClick={() => setEditable(false)}
          >
            ❌
          </span>
          <span
            role="img"
            aria-labelledby="save edit"
            style={{ marginLeft: '1rem' }}
            onClick={handleUpdate}
          >
            ✅
          </span>
        </>
      ) : (
        <>
          {!todo.complete && (
            <>
              <span
                role="img"
                aria-labelledby="edit"
                style={{ marginLeft: '1rem' }}
                onClick={() => setEditable(true)}
              >
                ✏️
              </span>
              <span
                role="img"
                aria-labelledby="delete"
                style={{ marginLeft: '1rem' }}
                onClick={() =>
                  dispatch({ type: 'DELETE_TODO', payload: todo.id })
                }
              >
                🗑️
              </span>
            </>
          )}
          <input type="checkbox" checked={complete} onChange={markComplete} />
        </>
      )}
    </div>
  );
};

export default TodoItem;

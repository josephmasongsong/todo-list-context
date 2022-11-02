import { createContext, ReactNode, useReducer } from 'react';

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'UPDATE_TODO'; payload: Todo };

type InitState = {
  todos: Todo[];
};

type Dispatch = (action: Action) => void;

export type Todo = {
  id: number;
  title: string;
  complete: boolean;
};

interface ChildProps {
  children?: ReactNode;
}

export const TodoContext = createContext<{
  state: InitState;
  dispatch: Dispatch;
} | null>(null);

const initState: InitState = {
  todos: [
    {
      id: 1,
      title: 'Gym 💪',
      complete: false,
    },
    {
      id: 2,
      title: 'Tan 🏝️',
      complete: false,
    },
    {
      id: 3,
      title: 'Laundry 👕',
      complete: true,
    },
  ],
};

const todosReducer = (state: typeof initState, action: Action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, action.payload],
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'UPDATE_TODO':
      return {
        todos: state.todos.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    default:
      return state;
  }
};

const TodoContextProvider = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(todosReducer, initState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;

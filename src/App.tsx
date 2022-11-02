import './App.css';
import TodoContextProvider from './contexts/TodoContext';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

export default function App() {
  return (
    <TodoContextProvider>
      <div className="App">
        <h1>Todo list with useContext and useReducer</h1>
        <TodoList />
        <AddTodo />
      </div>
    </TodoContextProvider>
  );
}

import { useReducer, useState } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

const ACTIONS = {
  ADD_TODO: "add_todo",
  TOGGLE_COMPLETE: "toggle_complete",
  DELETE_TODO: "delete_todo",
  EDIT_TODO: "edit_todo",
};

function todoReducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [{ id: Date.now(), desc: action.payload.desc, complete: false }, ...todos];
    case ACTIONS.TOGGLE_COMPLETE:
      return todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, complete: !todo.complete } : todo
      );
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id);
    case ACTIONS.EDIT_TODO:
      return todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, desc: action.payload.desc } : todo
      );
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (desc) => {
    if (desc.trim()) {
      dispatch({ type: ACTIONS.ADD_TODO, payload: { desc } });
      setNewTodo("");
    }
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo(newTodo);
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What do you need to do?"
        />
        <button type="submit">Add Todo</button>
      </form>
      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  );
}

export default App;

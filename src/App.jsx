import { useState, useReducer } from "react";
import TodoList from "./components/TodoList";
import "./App.css";


// Initial state for the todo list
const initialState = {
  todos: [],
};

// Reducer function to handle state updates
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return { todos: [{ ...action.payload, id: Date.now() }, ...state.todos] };

    case "DELETE_TODO":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "TOGGLE_COMPLETE":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, complete: !todo.complete }
            : todo
        ),
      };

    case "EDIT_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, desc: action.payload.desc }
            : todo
        ),
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    dispatch({
      type: "ADD_TODO",
      payload: { desc: newTodo, complete: false },
    });
    setNewTodo("");
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What do you have to do?"
        />
        <button type="submit">Add Todo</button>
      </form>
      <TodoList todos={state.todos} dispatch={dispatch} />
    </div>
  );
}

export default App;

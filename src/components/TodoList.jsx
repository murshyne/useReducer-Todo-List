/* eslint-disable react/prop-types */
import { useState } from "react";
import EditForm from "./EditForm";

function TodoList({ todos, dispatch }) {
  const [editTodoId, setEditTodoId] = useState(null);

  const handleDelete = (id) => {
    dispatch({ type: "delete_todo", payload: { id } });
  };

  const handleComplete = (id) => {
    dispatch({ type: "toggle_complete", payload: { id } });
  };

  const handleEdit = (id) => {
    setEditTodoId(id);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.complete ? "completed" : ""}`}
        >
          {editTodoId === todo.id ? (
            <EditForm
              todo={todo}
              dispatch={dispatch}
              setEditTodoId={setEditTodoId}
            />
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleComplete(todo.id)}
              />
              <span className={`todo-text ${todo.complete ? "strikethrough" : ""}`}>
                {todo.desc}
              </span>
              <div className="kebab-menu">
                <button onClick={() => handleEdit(todo.id, todo.desc)}>Edit</button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  disabled={!todo.complete}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

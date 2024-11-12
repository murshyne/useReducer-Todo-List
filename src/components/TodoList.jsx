import React, { useState } from "react";
import EditForm from "./EditForm";

const TodoList = ({ todos, dispatch }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  const handleToggleComplete = (id) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleEditTodo = (id, newDesc) => {
    dispatch({ type: "EDIT_TODO", payload: { id, desc: newDesc } });
    setEditingTodo(null);
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.complete ? "completed" : ""}`}
        >
          {editingTodo?.id === todo.id ? (
            <EditForm
              todo={todo}
              onSave={handleEditTodo}
              onCancel={() => setEditingTodo(null)}
            />
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleToggleComplete(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.complete ? "line-through" : "none",
                }}
              >
                {todo.desc}
              </span>
              <div className="kebab-menu">
                <button onClick={() => setShowMenu(todo.id)}>
                  &#x22EE; {/* Kebab Menu */}
                </button>
                {showMenu === todo.id && (
                  <div className="menu-options">
                    <button
                      onClick={() => {
                        setEditingTodo(todo);
                        setShowMenu(null);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteTodo(todo.id)}
                      disabled={!todo.complete}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

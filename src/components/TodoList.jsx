/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import EditForm from "./EditForm"; // Import the EditForm component

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
    setEditingTodo(null); // Exit edit mode after saving
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
                        setEditingTodo(todo); // Enable editing
                        setShowMenu(null); // Hide the kebab menu
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      disabled={!todo.complete} // Disable if not completed
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

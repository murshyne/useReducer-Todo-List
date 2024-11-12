/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

const EditForm = ({ todo, onSave, onCancel }) => {
  const [newDesc, setNewDesc] = useState(todo.desc);

  useEffect(() => {
    setNewDesc(todo.desc); // Ensure the form is populated with the current value
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDesc.trim()) {
      onSave(todo.id, newDesc); // Save the changes
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        value={newDesc}
        onChange={(e) => setNewDesc(e.target.value)}
        placeholder="Edit todo"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditForm;

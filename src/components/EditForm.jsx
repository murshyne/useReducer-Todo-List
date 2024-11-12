import React, { useState, useEffect } from "react";

const EditForm = ({ todo, onSave, onCancel }) => {
  const [newDesc, setNewDesc] = useState(todo.desc);

  useEffect(() => {
    setNewDesc(todo.desc);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDesc.trim()) {
      onSave(todo.id, newDesc);
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

/* eslint-disable react/prop-types */
import { useState } from "react";

function EditForm({ todo, dispatch, setEditTodoId }) {
  const [newDesc, setNewDesc] = useState(todo.desc);

  const handleChange = (e) => {
    setNewDesc(e.target.value);
  };

  const handleSave = () => {
    if (newDesc.trim()) {
      dispatch({
        type: "edit_todo",
        payload: { id: todo.id, desc: newDesc },
      });
      setEditTodoId(null); // Exit edit mode
    }
  };

  const handleCancel = () => {
    setEditTodoId(null); // Exit edit mode without saving
  };

  return (
    <div>
      <input
        type="text"
        value={newDesc}
        onChange={handleChange}
        placeholder="Edit todo"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default EditForm;

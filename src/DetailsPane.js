import React, { useState } from 'react';

export default function DetailsPane(props) {
  const [value, setValue] = useState(props.defaultValue);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  }

  const handleSave = () => {
    setEditing(false);
    props.onSave(value);
  }

  const handleCancel = () => {
    setEditing(false);
    setValue(props.defaultValue);
  }

  const handleChange = (event) => {
    setValue(event.target.value.split(","));
  }

  return (
    <div>
      {editing ? (
        <div>
          <input type="text" value={value} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          {value.length > 0 && (
            <span>
              {value.join(", ")}
            </span>
          )}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={props.onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
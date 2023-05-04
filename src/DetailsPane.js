import React, { useState } from 'react';

export default function DetailsPane(props) {
  const index = props.index-1
  console.log('key',index)
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
    setValue(event.target.value.split(", "));
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
          Item {index}:
          {value.length > 0 && (
            <div style={{paddingLeft: "5%"}}>
              Smoothie: {value[0]}<br/>
              Size: {value[1]}<br/>
              Add: {value[2]}<br/>
              Remove: {value[3]}<br/>
              Price: {value[4]}
            </div>
          )}
          {/* <button onClick={handleEdit}>Edit</button> */}
          <button onClick={props.onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from "react";

function Task({ name, isCompleted, onStatusUpdate, onDelete }) {
  const [checked, setChecked] = useState(isCompleted);

  function handleChecked() {
    const updatedChecked = !checked;
    setChecked(updatedChecked);
    onStatusUpdate(updatedChecked);
  }

  return (
    <div className={'task ' + (isCompleted ? 'complete' : 'not-completed')}>
      <div>
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={handleChecked}
        />
        <span>{name}</span>
      </div>
      <div>
        <button className="button">Edit</button>
        <button 
        className="button" 
        onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Task;
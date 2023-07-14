import { useState } from "react";

function Task({ name, isCompleted, onStatusUpdate, onDelete, onEdit }) {
  const [checked, setChecked] = useState(isCompleted);
  const [editMode, setEditMode] = useState(false);

  function handleChecked() {
    const updatedChecked = !checked;
    setChecked(updatedChecked);
    onStatusUpdate(updatedChecked);
  }

  function handleSubmit(e){
    e.preventDefault();
    setEditMode(false)
}

  return (
    <div className={'task ' + (isCompleted ? 'complete' : 'not-completed')}>
      <div className="taskData">
        <input
          type="checkbox"
          className="checkbox"
          name="checkbox"
          checked={checked}
          onChange={handleChecked}
        />
        { 
          !editMode ? 
            ( <span>{name}</span> ) 
            :
            (<form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" 
              value={name}
              className="editTaskInput"
              onChange={(e) => onEdit(e.target.value)}/>
            </form>
            )
          }
      </div>
      <div>
        <button 
        className="button"
        onClick={() => setEditMode(!editMode)}>Edit</button>
        <button 
        className="button" 
        onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Task;
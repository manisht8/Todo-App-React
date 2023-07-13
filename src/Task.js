import { useState } from "react";
// import { isCompositeComponent } from "react-dom/test-utils";

function Task({name, isCompleted}) {
    const [checked, setChecked] = useState(false);

    function handleChecked(isTaskCompleted) {
        if(isTaskCompleted)
            setChecked(true);
        else
            setChecked(false);
    }
    
    return (
        <div className="task">
            <div>
                <input 
                    type="checkbox" 
                    className="checkbox"
                    onChange={() => handleChecked({isCompleted})} 
                    value={checked}/>
                <span> {name} </span>
            </div>
            <div>
                <button className="button">Edit</button>
                <button className="button">Delete</button>
            </div>
        </div>
    );
}

export default Task;
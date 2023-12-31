import { useState } from "react";

function TaskInput({onTaskAdd}) {
    const [taskName, setTaskName] = useState("");

    function handleTaskInput(taskInput) {
        if(taskInput)
            setTaskName(taskInput);
    }

    function handleSubmit(e){
        e.preventDefault();
        onTaskAdd(taskName);
        setTaskName("");
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} id="taskInputForm">
            <input
                type="text"
                id="taskInput"
                placeholder="Enter Task"
                value={taskName}
                onChange={(e) => handleTaskInput(e.target.value)} />
            <button className="button" id="submitBtn">Add Task</button>
        </form>
    );
}

export default TaskInput;
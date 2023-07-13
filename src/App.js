import './App.css';
import TaskInput from './TaskInput.js';
import Task from './Task.js';
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  function handleAddTask(taskName) {
    if(taskName)
      setTodos([...todos, {name: taskName, isCompleted: false}]);
  }

  return (
    <div className="App">
      <div className="tasks-container">
        <h2>To-Do List</h2>
        <TaskInput onTaskAdd={(taskName) => handleAddTask(taskName) }/>
        {
          todos.map((task) => (
            <Task {...task}/>
          ))
        }
      </div>
    </div>
  );
}

export default App;

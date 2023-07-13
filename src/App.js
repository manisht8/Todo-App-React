import './App.css';
import TaskInput from './TaskInput.js';
import Task from './Task.js';
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  // monitor changes on state - save to localStorage
  useEffect(() => {
    if (todos.length === 0) return;
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  function handleAddTask(taskName) {
    if (taskName)
      setTodos([...todos, { name: taskName, isCompleted: false }]);
  }

  function handleCompleteTask(taskIndex, status) {
    const tempTodos = [...todos];
    tempTodos[taskIndex].isCompleted = status;
    setTodos(tempTodos);
  }

  return (
    <div className="App">
      <div className="tasks-container">
        <h2>To-Do List</h2>
        <TaskInput onTaskAdd={(taskName) => handleAddTask(taskName)} />
        {
          todos.map((task, index) => (
            <Task key={index} {...task} onStatusUpdate={(status) => handleCompleteTask(index, status)} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
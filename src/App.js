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

  function handleDeleteTask(taskIndex) {
    const tempTodos = todos.filter((task, index) => index !== taskIndex);
    console.log(taskIndex, tempTodos);
    setTodos(tempTodos);

    if (tempTodos.length === 0) {
      localStorage.removeItem('todos');
    }
  }

  let completedTasks = todos.filter((task) => task.isCompleted).length;
  let totalTasks = todos.length;

  function getMessage() {
    let progress = (completedTasks / totalTasks) * 100;
    if (progress === 100) {
      return "Well Done!";
    }
    if (progress >= 75) {
      return "Almost there!";
    }
    if (progress === 0) {
      return "Get few tasks done!";
    }
    return "You've got this!";
  }

  return (
    <div className="App">
      <div className="tasks-container">
        <h2>To-Do List</h2>
        <h3>{completedTasks}/{totalTasks} Tasks Completed!</h3>
        <h3>{getMessage()}</h3>
        <TaskInput onTaskAdd={(taskName) => handleAddTask(taskName)} />
        {
          todos.map((task, index) => (
            <Task 
            {...task} 
            key={index} 
            onStatusUpdate={(status) => handleCompleteTask(index, status)}
            onDelete={() => handleDeleteTask(index)} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
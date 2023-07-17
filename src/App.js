import './App.css';
import TaskInput from './TaskInput.js';
import Task from './Task.js';
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

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

  // add task
  function handleAddTask(taskName) {
    if (taskName)
      setTodos([...todos, { name: taskName, isCompleted: false }]);
  }

  // on completing task
  function handleCompleteTask(taskIndex, status) {
    const tempTodos = [...todos];
    tempTodos[taskIndex].isCompleted = status;
    setTodos(tempTodos);
  }

  // on deleting task
  function handleDeleteTask(taskIndex) {
    const tempTodos = todos.filter((task, index) => index !== taskIndex);
    setTodos(tempTodos);

    if (tempTodos.length === 0) {
      localStorage.removeItem('todos');
    }
  }

  // on editing task
  function handleEditTask(taskIndex, newName) {
    const tempTodos = [...todos];
    tempTodos[taskIndex].name = newName;
    setTodos(tempTodos);
  }

  // custom message
  let completedTasks = todos.filter((task) => task.isCompleted).length;
  let totalTasks = todos.length;
  function getMessage() {
    let progress = (completedTasks / totalTasks) * 100;
    if (progress === 100) {
      return "Well Done!";
    }
    else if (progress >= 75) {
      return "Almost there!";
    }
    else if (progress === 0) {
      return "Get few tasks done!";
    }
    else {
      return "You've got this!";
    }
  }

  // tasks filter
  function handleTaskFilter() {
    if (filter === "Active") {
      return todos.filter((task) => task.isCompleted === false);
    }
    else if (filter === "Completed") {
      return todos.filter((task) => task.isCompleted === true);
    }
    else {
      return todos;
    }
  }

  // deleting multiple tasks
  function handleMultipleDelete(deleteCriteria) {
    if (deleteCriteria === "Completed") {
      const tempTodos = todos.filter((task) => task.isCompleted !== true);
      setTodos(tempTodos);

      if (tempTodos.length === 0) {
        localStorage.removeItem('todos');
      }
    }

    else if(deleteCriteria === "All") {
      setTodos([]);
      localStorage.removeItem('todos');
    }
  }

  return (
    <div className="App">
      <div className="tasks-container">

        <h2>To-Do List</h2>
        <h3>{completedTasks}/{totalTasks} Tasks Completed!</h3>
        <h3>{getMessage()}</h3>

        <TaskInput onTaskAdd={(taskName) => handleAddTask(taskName)} />

        {
          handleTaskFilter().map((task, index) => (
            <Task
              {...task}
              key={index}
              onStatusUpdate={(status) => handleCompleteTask(index, status)}
              onEdit={(newName) => handleEditTask(index, newName)}
              onDelete={() => handleDeleteTask(index)} />
          ))
        }

        <div>
          <button
            className="button"
            onClick={() => setFilter("All")}>All</button>
          <button
            className="button"
            onClick={() => setFilter("Active")}>Active</button>
          <button
            className="button"
            onClick={() => setFilter("Completed")}>Completed</button>
        </div>

        <div>
          <button
            className="button"
            onClick={() => handleMultipleDelete("Completed")}>Delete Completed Tasks</button>
          <button
            className="button"
            onClick={() => handleMultipleDelete("All")}>Delete All Tasks</button>
        </div>

      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import "./App.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on first render
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(""); // Clear input field
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <h5 className="creator">Created by Prateek</h5>

      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.length > 0 && (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={`task-item ${task.completed ? "completed" : ""}`}>
              <span className="task-text">{task.text}</span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                className="checkbox"
              />
              <button className="remove-btn" onClick={() => removeTask(index)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoApp;

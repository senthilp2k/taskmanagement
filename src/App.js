import React, { useState } from 'react';
import './style.css';
import TaskList from './TaskList';

function App() {
  // Example tasks array
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', state: 'ToDo' },
    { id: 2, title: 'Task 2', state: 'InProgress' },
    { id: 3, title: 'Task 3', state: 'Done' },
  ]);

  // Define functions for handling task operations
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div>
      {/* Render the TaskList component and pass props */}
      <TaskList
        tasks={tasks}
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;

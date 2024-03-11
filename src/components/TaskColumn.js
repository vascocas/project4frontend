import React from 'react';
import TaskCard from './TaskCard';
import "./TasksBoard.css";

function TaskColumn({ title, tasks, onTaskDelete }) {
   // Define a function to handle task deletion
   const handleTaskDelete = () => {
    if (typeof onTaskDelete === 'function') {
      onTaskDelete(); // Call onTaskDelete function if it exists
    }
  };

  return (
    <div className="task-column">
      <h2>{title}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard title={task.title} priority={task.priority} taskId={task.id} onTaskDelete={handleTaskDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskColumn;

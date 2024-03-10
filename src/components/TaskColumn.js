import React from 'react';
import TaskCard from './TaskCard';
import TaskOptions from './TaskOptions';
import "./TasksBoard.css";

function TaskColumn({ title, tasks }) {
  // Remove the sortedTasks line, as sorting is now done in the parent component (TasksBoard)

  return (
    <div className="task-column">
      <h2>{title}</h2>
      <ul>
        {tasks.map((task) => ( // No need to sort tasks here, as they are already sorted in the parent component
          <li key={task.id}>
            <TaskCard title={task.title} priority={task.priority} />
            <TaskOptions taskId={task.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskColumn;

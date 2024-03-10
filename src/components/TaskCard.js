import React from 'react';
import "./TasksBoard.css";

function TaskCard({ title, priority }) {
  let priorityClass = "";
  if (priority === "LOW_PRIORITY") {
    priorityClass = "low-priority";
  } else if (priority === "MEDIUM_PRIORITY") {
    priorityClass = "medium-priority";
  } else if (priority === "HIGH_PRIORITY") {
    priorityClass = "high-priority";
  }

  return (
    <div className={`task-card ${priorityClass}`}>
      <div className="card-header">{title}</div>
    </div>
  );
}

export default TaskCard;

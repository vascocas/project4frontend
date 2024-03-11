
import React, { useState } from "react";
import { userStore } from "../stores/UserStore";
import { taskStore } from "../stores/TaskStore";
import { useNavigate } from 'react-router-dom';
import "./TasksBoard.css";

import "./TasksBoard.css";

function TaskCard({ title, priority, taskId, onTaskDelete }) {

  const { token } = userStore();
  const [showOptions, setShowOptions] = useState(false); // State variable for visibility of options
  const [selectedColumn, setSelectedColumn] = useState(""); // State variable for selected column

  const navigate = useNavigate();


  let priorityClass = "";
  if (priority === "LOW_PRIORITY") {
    priorityClass = "low-priority";
  } else if (priority === "MEDIUM_PRIORITY") {
    priorityClass = "medium-priority";
  } else if (priority === "HIGH_PRIORITY") {
    priorityClass = "high-priority";
  }

  const handleRemove = async () => {
    try {
      // Send HTTP request to update task deleted boolean
      const response = await fetch(
        "http://localhost:8080/project4vc/rest/tasks/updateDeleted",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "token": token,
            "taskId": taskId,
          },
        }
      );

      if (response.ok) {
        const successMessage = await response.text();
        console.log(successMessage);
        onTaskDelete();
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMove = async () => {
  
    if (!selectedColumn) {
      // Check if a column is selected
      alert("Please select a column.");
      return;
    }

    try {
      // Construct request body
      const requestBody = JSON.stringify({
        id: taskId,
        state: selectedColumn,
      });

      // Send HTTP request to update task state
      const response = await fetch(
        "http://localhost:8080/project4vc/rest/tasks/status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: requestBody,
        }
      );

      // Handle response based on OK or not
      if (response.ok) {
        const successMessage = await response.text();
        console.log(successMessage);
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Close the options menu after handling the move action
    setShowOptions(false);
  };

  const handleConsult = () => {
    taskStore.getState().setTaskId(taskId); // Update taskId in the taskStore
    navigate('../Task');
    setShowOptions(false); // Close the options menu
  };

  return (
    <div className={`task-card ${priorityClass}`} onClick={() => setShowOptions(!showOptions)}>
    <div className="card-header">{title}</div>
    <div className="task-options">
      {showOptions && (
        <>
          <select
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            <option value="">Select a column</option>
            <option value="TODO">TO DO</option>
            <option value="DOING">DOING</option>
            <option value="DONE">DONE</option>
          </select>
          <button onClick={() => handleMove(taskId)}>Move</button>
          <button onClick={() => handleConsult(taskId)}>Consult</button>
          <button onClick={() => handleRemove(taskId)}>Remove</button>
        </>
      )}
    </div>
  </div>
  );
 
}
export default TaskCard;

import React, { useState } from "react";
import { userStore } from "../stores/UserStore";
import { taskStore } from "../stores/TaskStore";
import { useNavigate } from 'react-router-dom';
import "./TasksBoard.css";

function TaskCard({ title, priority, taskId, onTaskDelete }) {

  const { token } = userStore();
  const [showOptions, setShowOptions] = useState(false); // State variable for visibility of options
  const [showMoveOptions, setShowMoveOptions] = useState(false); // State variable for visibility of move options
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

  const handleMove = () => {
    setShowOptions(false);
    setShowMoveOptions(true);
  };

  const handleDropdownChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  const handleMoveConfirm = async () => {
    if (!selectedColumn) {
      alert("Please select a column.");
      return;
    }

    try {
      const requestBody = JSON.stringify({
        id: taskId,
        state: selectedColumn,
      });

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

      if (response.ok) {
        const successMessage = await response.text();
        console.log(successMessage);
        setShowMoveOptions(false);
        setShowOptions(false); // Hide all options after moving
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleConsult = () => {
    taskStore.getState().setTaskId(taskId);
    navigate('../Task');
    setShowOptions(false);
  };

  return (
    <div className={`task-card ${priorityClass}`} onClick={() => setShowOptions(!showOptions)}>
      <div className="card-header">{title}</div>
      <div className="task-options">
        {showOptions && !showMoveOptions && (
          <>
            <button onClick={handleMove}>Move</button>
            <button onClick={handleConsult}>Consult</button>
            <button onClick={handleRemove}>Remove</button>
          </>
        )}
        {showMoveOptions && (
          <>
            <select
              value={selectedColumn}
              onChange={handleDropdownChange}
            >
              <option value="">Select a column</option>
              <option value="TODO">TO DO</option>
              <option value="DOING">DOING</option>
              <option value="DONE">DONE</option>
            </select>
            <button onClick={handleMoveConfirm}>Confirm Move</button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;

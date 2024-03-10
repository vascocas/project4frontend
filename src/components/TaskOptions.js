import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { userStore } from "../stores/UserStore";
import "./TasksBoard.css";
import { compareTasks } from "./TaskUtils"; // Import compareTasks function

function TaskOptions({ taskId }) {
  const { token } = userStore();
  const [showOptions, setShowOptions] = useState(false); // State variable for visibility of options
  const [selectedColumn, setSelectedColumn] = useState(""); // State variable for selected column

  const handleRemove = async () => {
    try {
      // Send HTTP request to update task deleted boolean
      const response = await fetch(
        "http://localhost:8080/project4vc/rest/tasks/updateDeleted",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
            taskId: taskId,
          },
        }
      );

      if (response.ok) {
        const successMessage = await response.text();
        console.log(successMessage);
        // Handle success response (if needed)
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
        // Handle error response (if needed)
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (if needed)
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
        // Handle success response (if needed)
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
        // Handle error response (if needed)
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (if needed)
    }

    // Close the options menu after handling the move action
    setShowOptions(false);
  };

  const handleConsult = () => {
    // No need to implement HTTP request, simply navigate to the Task.js page
    setShowOptions(false); // Close the options menu
  };

  return (
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
          <button onClick={handleMove}>Move</button>
          <button onClick={handleRemove}>Remove</button>
          <Link to={`../Task/${taskId}`} onClick={handleConsult}>Consult</Link>
        </>
      )}
      <button onClick={() => setShowOptions(!showOptions)}>Options</button>
    </div>
  );
}

export default TaskOptions;

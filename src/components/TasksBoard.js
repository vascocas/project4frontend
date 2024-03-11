import React, { useEffect, useState } from "react";
import { userStore } from "../stores/UserStore";
import { compareTasks } from "./TaskUtils";
import TaskColumn from "./TaskColumn";
import "./TasksBoard.css";

function TasksBoard() {
  const { token } = userStore();
  const [tasks, setTasks] = useState([]);

  // Define fetchTasks function
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/project4vc/rest/tasks/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.ok) {
        let tasks = await response.json();
        tasks = sortTasks(tasks); // Sort tasks before setting state
        setTasks(tasks);
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch tasks. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]); 

  // Function to sort tasks by priority, start date, and end date
  function sortTasks(tasks) {
    return tasks.slice().sort(compareTasks); // Use slice() to avoid mutating original tasks array
  }

    // Function to fetch tasks again after deleting a task
    const handleTaskDelete = () => {
      fetchTasks();
    };

  return (
    <div className="task-columns">
      <TaskColumn
        title="TODO"
        tasks={tasks.filter((task) => task.state === "TODO")}
        onTaskDelete={handleTaskDelete}
      />
      <TaskColumn
        title="DOING"
        tasks={tasks.filter((task) => task.state === "DOING")}
        onTaskDelete={handleTaskDelete}
      />
      <TaskColumn
        title="DONE"
        tasks={tasks.filter((task) => task.state === "DONE")}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
}

export default TasksBoard;

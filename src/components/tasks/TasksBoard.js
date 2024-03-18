import React, { useEffect, useState } from "react";
import { userStore } from "../../stores/UserStore";
import { taskStore } from "../../stores/TaskStore";
import { compareTasks } from "./TaskUtils";
import TaskColumn from "./TaskColumn";
import TasksUserFilter from "./TasksUserFilter";
import TasksCategoryFilter from "./TasksCategoryFilter";
import RemoveUserTasks from "./RemoveUserTasks";
import "./TasksBoard.css";

function TasksBoard() {
  const { token } = userStore();
  const { tasks, setTasks } = taskStore();
  const [filteredUserId, setFilteredUserId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");

  // Define fetchTasks function
  const fetchTasks = async () => {
    if (!token) {
      return; // If token is not present, exit the function early
    }
    try {
      let url = "http://localhost:8080/project4vc/rest/tasks/all";
      if (filteredUserId) {
        url += `/user/${filteredUserId}`;
      } else if (filteredCategoryId) {
        url += `/category/${filteredCategoryId}`;
      }
      console.log("URL for HTTP request:", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.ok) {
        let tasks = await response.json();
        console.log("HTTP request to fetch tasks successful");
        tasks = sortTasks(tasks); // Sort tasks before setting state
        setTasks(tasks);
      } else {
        const message = await response.text();
        console.error("Tasks array is empty:", message);
        setTasks([]);
        alert("Tasks array is empty", message);
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
  }, [token, filteredUserId, filteredCategoryId]);

  // Function to sort tasks by priority, start date, and end date
  function sortTasks(tasks) {
    return tasks.slice().sort(compareTasks); // Use slice() to avoid mutating original tasks array
  }

  const handleUserFilter = (userId) => {
    setFilteredUserId(userId);
    setFilteredCategoryId(""); // Reset category filter
  };

  const handleCategoryFilter = (categoryId) => {
    console.log("User filter applied with user ID:", categoryId);
    setFilteredCategoryId(categoryId);
    setFilteredUserId(""); // Reset user filter
  };

  const fetchAllTasks = () => {
    // Clear both filters
    setFilteredUserId("");
    setFilteredCategoryId("");
  };

  return (
    <div>
      <div className="filters">
        <div className="filters-box">
          <h3 id="filtersTitle">Filters</h3>
          <TasksUserFilter onFilter={handleUserFilter} />
          <TasksCategoryFilter onFilter={handleCategoryFilter} />
          <button id="clearButton" onClick={fetchAllTasks}>
            Clear
          </button>
        </div>
        <div className="remove-user-tasks">
        <h3 id="filtersTitle">Remove Tasks</h3>
          <RemoveUserTasks fetchTasks={fetchTasks}/>
        </div>
      </div>

      <div className="task-columns">
        <TaskColumn
          title="TODO"
          tasks={tasks.filter((task) => task.state === "TODO")}
        />
        <TaskColumn
          title="DOING"
          tasks={tasks.filter((task) => task.state === "DOING")}
        />
        <TaskColumn
          title="DONE"
          tasks={tasks.filter((task) => task.state === "DONE")}
        />
      </div>
    </div>
  );
}

export default TasksBoard;

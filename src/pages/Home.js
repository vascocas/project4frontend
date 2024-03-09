import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/navbar/Sidebar";
import { userStore } from "../stores/UserStore";
import "../index.css";
import "./Home.css";

function Home() {
  const { username, token } = userStore();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
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
          const tasks = await response.json();
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

    getAllTasks();
  }, [token]); // Make sure to include token as a dependency to trigger the effect when it changes

  return (
    <div className="Home" id="home-outer-container">
      <Header user={username} />
      <Sidebar
        pageWrapId={"home-page-wrap"}
        outerContainerId={"home-outer-container"}
      />
      <div className="page-wrap" id="home-page-wrap">
        <h1>Scrum Board</h1>
        <div className="task-columns">
          {/* Render task columns */}
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
    </div>
  );
}

// TaskColumn component to render tasks within a column with sorting and background color adjustment
function TaskColumn({ title, tasks }) {
  const sortedTasks = sortTasks(tasks);

  return (
    <div className="task-column">
      <h2>{title}</h2>
      <ul>
        {/* Render tasks */}
        {sortedTasks.map((task) => {
          console.log("Task Status:", task.state);
          console.log("Task Priority:", task.priority);
          return (
            <li
              key={task.id}
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              <TaskCard title={task.title} priority={task.priority} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// TaskCard component to render individual task cards
function TaskCard({ title, priority }) {
  // Determine priority class
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
      {/* Add more card content here if needed */}
    </div>
  );
}

// Define a comparison function for sorting tasks
function compareTasks(taskA, taskB) {
  // First, compare by priority
  if (taskA.priority !== taskB.priority) {
    const priorityOrder = ["LOW_PRIORITY", "MEDIUM_PRIORITY", "HIGH_PRIORITY"];
    return priorityOrder.indexOf(taskB.priority) - priorityOrder.indexOf(taskA.priority);
  }
  // If priority is equal, compare by start date
  const startDateA = new Date(taskA.startDate);
  const startDateB = new Date(taskB.startDate);
  if (startDateA.getTime() !== startDateB.getTime()) {
    return startDateA.getTime() - startDateB.getTime();
  }
  // If start dates are equal, compare by end date
  const endDateA = new Date(taskA.endDate);
  const endDateB = new Date(taskB.endDate);
  return endDateA.getTime() - endDateB.getTime();
}

// Function to sort tasks by multiple parameters
function sortTasks(tasks) {
  return tasks.slice().sort(compareTasks); // Use slice() to avoid mutating original tasks array
}

// Function to get background color based on priority
function getPriorityColor(priority) {
  if (priority === "HIGH_PRIORITY") {
    return "red";
  } else if (priority === "MEDIUM_PRIORITY") {
    return "yellow";
  } else if (priority === "LOW_PRIORITY") {
    return "green";
  }
  return ""; // Default color if priority is not recognized
}

export default Home;

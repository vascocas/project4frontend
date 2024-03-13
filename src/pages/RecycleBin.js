import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/navbar/Sidebar";
import { userStore } from "../stores/UserStore";
import { taskStore } from "../stores/TaskStore";
import { useNavigate } from "react-router-dom";
import "../index.css";

const RecycleBin = () => {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const { token } = userStore();

  useEffect(() => {
    const fetchDeletedTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/project4vc/rest/tasks/deletedTasks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
              token: token,
            },
          }
        );
        if (response.ok) {
          const tasks = await response.json();
          setDeletedTasks(tasks);
        } else {
          throw new Error(`Failed to fetch deleted tasks: ${response.text()}`);
        }
      } catch (error) {
        console.error("Error fetching deleted tasks:", error);
      }
    };

    fetchDeletedTasks();
  }, []);

  const restoreTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/project4vc/rest/tasks/restoreDeleted`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: token,
            taskId: taskId,
          },
        }
      );
      const message = await response.text();
      if (response.ok) {
        alert(message);
        const updatedTasks = deletedTasks.filter((task) => task.id !== taskId);
        setDeletedTasks(updatedTasks);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error restoring task:", error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/project4vc/rest/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: token,
          },
        }
      );
      const message = await response.text();
      if (response.ok) {
        alert(message);
        const updatedTasks = deletedTasks.filter((task) => task.id !== taskId);
        setDeletedTasks(updatedTasks);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  return (
    <div className="container" id="recycle-outer-container">
      <Header />
      <Sidebar
        pageWrapId={"recycle-page-wrap"}
        outerContainerId={"recycle-outer-container"}
      />
      <aside>
        {deletedTasks.map((task) => (
          <div key={task.id}>
            <button onClick={() => restoreTask(task.id)}>Restore Task</button>
            <button onClick={() => removeTask(task.id)}>Remove Task</button>
          </div>
        ))}
      </aside>
      <main>
        <table className="table-recycle">
          <thead className="table-header-recycle">
            <tr>
              <th className="table-header-recycle">Id</th>
              <th className="table-header-recycle">Name</th>
            </tr>
          </thead>
          <tbody>
            {deletedTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default RecycleBin;

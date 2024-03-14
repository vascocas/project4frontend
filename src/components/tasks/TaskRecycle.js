import React, { useEffect } from "react";
import { taskStore } from "../../stores/TaskStore";
import { userStore } from "../../stores/UserStore";
import "../../pages/RecycleBin.css";

const TaskRecycle = () => {
  const { deletedTasks, setDeletedTasks } = taskStore();
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
          throw new Error(
            `Failed to fetch deleted tasks: ${await response.text()}`
          );
        }
      } catch (error) {
        console.error("Error fetching deleted tasks:", error);
      }
    };

    fetchDeletedTasks();
  }, [token, setDeletedTasks]);

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
        taskStore.getState().restoreTask(taskId); // Update taskStore
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
        taskStore.getState().removeTask(taskId); // Update taskStore
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  return (
    <table className="table-recycle">
      <thead className="table-header-recycle">
        <tr>
          <th className="table-header-recycle">Id</th>
          <th className="table-header-recycle">Name</th>
          <th className="table-header-recycle">Actions</th>
        </tr>
      </thead>
      <tbody>
        {deletedTasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>
              <button className="recycle-button" onClick={() => restoreTask(task.id)}>Restore Task</button>
              <button className="recycle-button" onClick={() => removeTask(task.id)}>Remove Task</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskRecycle;

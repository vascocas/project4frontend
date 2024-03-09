import React, { useState, useEffect } from "react";
import { userStore } from "../stores/UserStore";
import "./AddTaskForm.css";

function AddTaskForm() {
  const { token } = userStore();
  const [categories, setCategories] = useState([]);
  const [priority, setPriority] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/project4vc/rest/tasks/categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <aside className="add-task-sidebar">
      <div className="add-task-container">
        <h3 id="addTask-h3">Add task</h3>
        <label className="labels-task-name" htmlFor="taskName">
          Title
        </label>
        <input
          type="text"
          id="taskName"
          placeholder="required"
          maxLength="20"
        />
        <label className="labels-task-description" htmlFor="taskDescription">
          Description
        </label>
        <textarea id="taskDescription" placeholder="required"></textarea>
        <label className="labels-task-dates" htmlFor="startDate">
          Start date
        </label>
        <input type="date" id="startDate" required />
        <label className="labels-task-dates" htmlFor="endDate">
          End date
        </label>
        <input type="date" id="endDate" required />
        <label htmlFor="priority">Priority</label>
        <div className="dropdown-priority">
          <select
            id="dropdown-task-priority"
            value={priority}
            onChange={handlePriorityChange}
            required>
            <option value="">Select priority</option>
            <option value="LOW_PRIORITY">Low</option>
            <option value="MEDIUM_PRIORITY">Medium</option>
            <option value="HIGH_PRIORITY">High</option>
          </select>
          </div>
          <div className="dropdown-category">
          <label className="labels-task-category" htmlFor="dropdown-task-categories">Category</label>
          <select name="task-categories" id="dropdown-task-categories" required>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="add-button">
          <button id="addTask">Add task</button>
          <p id="warningMessage2"></p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AddTaskForm;

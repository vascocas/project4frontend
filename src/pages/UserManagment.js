import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/navbar/Sidebar";
import { userStore } from "../stores/UserStore";
import { taskStore } from "../stores/TaskStore";
import { useNavigate } from "react-router-dom";
import "../index.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const tokenValue = sessionStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/project3-backend/rest/users/checkUsers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: tokenValue,
          },
        }
      );

      if (response.ok) {
        const usersArray = await response.json();
        setUsers(usersArray);
      } else {
        alert(response.status);
      }
    } catch (error) {
      console.error("Error loading users list:", error);
    }
  };

  const roleMapping = {
    100: "DEVELOPER",
    200: "SCRUM_MASTER",
    300: "PRODUCT_OWNER",
  };

  const deletedMapping = {
    false: "Not deleted",
    true: "Deleted",
  };

  return (
        <div className="container" id="users-outer-container">
      <Header />
      <Sidebar
        pageWrapId={"users-page-wrap"}
        outerContainerId={"users-outer-container"}
      />
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Deleted</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{roleMapping[user.role] || "Unknown Role"}</td>
              <td>{deletedMapping[user.deleted] || "Unknown"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

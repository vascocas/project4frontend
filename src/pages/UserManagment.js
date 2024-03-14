import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/navbar/Sidebar";
import { userStore } from "../stores/UserStore";
import { taskStore } from "../stores/TaskStore";
import { useNavigate } from "react-router-dom";
import "../index.css";

const UserManagement = () => {
  const { token, users, setUsers } = userStore();

  const deletedMapping = {
    false: "Active",
    true: "Deleted",
  };

  const fetchUsers = async () => {
    try {
      const tokenValue = sessionStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/project4vc/rest/users/users",
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
        const usersArray = await response.json();
        setUsers(usersArray);
      } else {
        alert(response.status);
      }
    } catch (error) {
      console.error("Error loading users list:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  

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
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{deletedMapping[user.deleted]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

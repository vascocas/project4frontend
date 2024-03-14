import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/navbar/Sidebar";
import { userStore } from "../stores/UserStore";
import AddUserForm from "../components/users/AddUserForm";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "./UserManagement.css";

const UserManagement = () => {
  const navigate = useNavigate();
  const { token, users, setUsers } = userStore();

  const deletedMapping = {
    false: "Active",
    true: "Deleted",
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/project4vc/rest/users",
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
      <h1 className="page-title">User Management</h1>
      <div className="content">
        <div className="users-add-form">
          <AddUserForm />
        </div>
        <div className="users-board">
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
          <div className="homeMenu-button-container">
            <button className="users-button" onClick={() => navigate("/Home")}>
              Back to Scrum Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default UserManagement;

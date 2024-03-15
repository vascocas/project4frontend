import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/navbar/Sidebar";
import AddUserForm from "../components/users/AddUserForm";
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "./UserManagement.css";

const UserManagement = () => {
  const navigate = useNavigate();
  const { token, users, setUsers } = userStore();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [roles, setRoles] = useState({});

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
        console.log(usersArray);
        setUsers(usersArray);
      } else {
        setUsers([]);
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, [token, setUsers]);

  const removeUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/project4vc/rest/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: token,
          },
        }
      );
      if (response.ok) {
        fetchUsers();
      } else {
        // Handle error
        alert("Failed to remove user.");
      }
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const handleUpdateRole = (userId) => {
    setSelectedUserId(userId); // Set the selected user ID
  };

  const handleRoleChange = (e, userId) => {
    const updatedRoles = { ...roles }; // Create a copy of the roles state
    updatedRoles[userId] = e.target.value; // Update the role for the specific user
    setRoles(updatedRoles); // Update the roles state
  };

  const handleConfirmUpdateRole = async (userId) => {
    const newRole = roles[userId]; // Get the role for the selected user
    if (!newRole) {
      alert("Please select a role.");
      return;
    }

    try {
      const userData = {
        id: userId,
        role: newRole,
      };
      const requestBody = JSON.stringify(userData);
      const response = await fetch(
        `http://localhost:8080/project4vc/rest/users/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: token,
          },
          body: requestBody,
        }
      );
      if (response.ok) {
        fetchUsers();
        setSelectedUserId(null); // Reset selected user ID
      } else {
        // Handle error
        alert("Failed to update user role.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    {selectedUserId === user.id ? (
                      <select
                        value={roles[user.id] || ""}
                        onChange={(e) => handleRoleChange(e, user.id)}
                      >
                        <option value="">Select Role</option>
                        <option value="DEVELOPER">DEVELOPER</option>
                        <option value="SCRUM_MASTER">SCRUM_MASTER</option>
                        <option value="PRODUCT_OWNER">PRODUCT_OWNER</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>{deletedMapping[user.deleted]}</td>
                  <td>
                    <div>
                      <button
                        className="users-table-button"
                        onClick={() => handleUpdateRole(user.id)}
                      >
                        Update Role
                      </button>
                      <button
                        className="users-table-button"
                        onClick={() => removeUser(user.id)}
                      >
                        Remove User
                      </button>
                      {selectedUserId === user.id && (
                        <button
                          className="users-table-button"
                          onClick={() => handleConfirmUpdateRole(user.id)}
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  </td>
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

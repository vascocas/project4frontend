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
  const [newRole, setNewRole] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

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
                <td>{user.role}</td>
                <td>{deletedMapping[user.deleted]}</td>
                <td>
                  <div>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="DEVELOPER">DEVELOPER</option>
                      <option value="SCRUM_MASTER">SCRUM_MASTER</option>
                      <option value="PRODUCT_OWNER">PRODUCT_OWNER</option>
                    </select>
                    <button
                      className="users-table-button"
                      onClick={() => {
                        // Check if both user ID and new role are selected
                        if (!selectedUserId || !newRole) {
                          alert("Please select a user and a role.");
                          return;
                        }
                        const userData = {
                          id: selectedUserId,
                          role: newRole,
                        };
                        const requestBody = JSON.stringify(userData);
                        fetch(
                          `http://localhost:8080/project4vc/rest/users/updateRole/${selectedUserId}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Accept: "*/*",
                              token: token,
                            },
                            body: requestBody,
                          }
                        ).then((response) => {
                          if (response.ok) {
                            fetchUsers();
                            // Reset selected user and role
                            setSelectedUserId(null);
                            setNewRole("");
                          } else {
                            // Handle error
                            alert("Failed to update user role.");
                          }
                        }).catch((error) => {
                          console.error("Error updating user role:", error);
                        });
                      }}
                    >
                      Update Role
                    </button>
                    <button
                      className="users-table-button"
                      onClick={() => removeUser(user.id)}
                    >
                      Remove User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="homeMenu-button-container">
          <button
            className="users-button"
            onClick={() => navigate("/Home")}
          >
            Back to Scrum Board
          </button>
        </div>
      </div>
    </div>
  </div>
);
};


export default UserManagement;

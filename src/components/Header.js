import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { userStore } from "../stores/UserStore";

const Header = () => {
  const { username, token, updateName, updateToken } = userStore();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/project4vc/rest/users/logout",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      updateName(""); // Clear username
      updateToken(""); // Clear token
      navigate('/login'); // Redirect to the Login page after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <header>
      <div className="header-right">
        <div className="welcome-message">Welcome, <span className="user-name">{username}</span></div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;

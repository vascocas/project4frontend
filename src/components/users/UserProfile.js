import React from "react";
import { userStore } from "../../stores/UserStore";

const UserProfile = () => {
  const { usernames, setSelectedProfileUsername } = userStore(); // Destructure setSelectedProfileUsername from userStore

  const handleSelect = (e) => {
    const selectedUsername = e.target.value;
    setSelectedProfileUsername(selectedUsername); // Update selected profile username in userStore
  };

  const handleClear = () => {
    setSelectedProfileUsername(""); // Clear selected profile username
  };

  return (
    <div>
      <label htmlFor="user">Consult user profile:</label>
      <br />
      <select id="user">
        <option value="">Select Username</option>
        {usernames.map((username) => (
          <option key={username.id} value={username.username}>
            {username.username}
          </option>
        ))}
      </select>
      <button id="selectButton" onClick={handleSelect}>Select</button>
      <br />
      <button id="clearButton" onClick={handleClear}>Clear</button>
    </div>
  );
};

export default UserProfile;

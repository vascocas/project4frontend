import React, { useState } from "react";
import { userStore } from "../../stores/UserStore";
import "../../pages/UserManagement.css";

function AddUserForm() {
  const { token, users, setUsers } = userStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleAddUser = async () => {
    try {
      // Clear previous error message
      setMessage("");
      // Validate form fields
      if (
        !username ||
        !password ||
        !email ||
        !firstName ||
        !lastName ||
        !phone
      ) {
        setMessage("All fields are required");
        return;
      }
      // Check if role is empty
      if (!role) {
        throw new Error("No role selected");
      }

      const requestBody = JSON.stringify({
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        phote: photo,
        role: role,
      });

      const response = await fetch(
        "http://localhost:8080/project4vc/rest/users/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: requestBody,
        }
      );
      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        console.log("User added!");
        // Clear input fields after successful addition
        setUsername("");
        setPassword("");
        setEmail("");
        setFirstName("");
        setLastName("");
        setPhone("");
        setPhoto("");
        setRole("");
      } else {
        // Handle error response
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      setMessage(error.message); // Set error message
    }
  };

  return (
    <div className="add-user-form">
      <h3>Add User</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Photo (Optional)"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="DEVELOPER">Developer</option>
        <option value="SCRUM_MASTER">Scrum Master</option>
        <option value="PRODUCT_OWNER">Product Owner</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>
      <p id="warningMessage1">{message}</p>
    </div>
  );
}

export default AddUserForm;

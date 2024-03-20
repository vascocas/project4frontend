import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { setIsLoginPage } = userStore();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    photo: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      username,
      password,
      confirmPassword,
      email,
      firstName,
      lastName,
      phone,
      photo,
    } = inputs;

    // Check for empty inputs
    if (!username || !password || !email || !firstName || !lastName || !phone) {
      alert("All fields are required");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/project4vc/rest/users/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            email,
            firstName,
            lastName,
            phone,
            photo,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }
      alert("Successful Registration");
      navigate("/", { replace: true });
      setIsLoginPage(true);
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed. Verify all fields.");
    }
  };

  return (
    <div className="Register" id="register-outer-container">
      <div className="page-wrap" id="register-page-wrap">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your username:
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
          </label>

          <label>
            Enter your password:
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>

          <label>
            Confirm your password:
            <input
              type="password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
          </label>

          <label>
            Enter your email:
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Enter your first name:
            <input
              type="text"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
            />
          </label>

          <label>
            Enter your last name:
            <input
              type="text"
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
            />
          </label>

          <label>
            Enter your phone number:
            <input
              type="tel"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Enter your photo URL:
            <input
              type="text"
              name="photo"
              value={inputs.photo}
              onChange={handleChange}
            />
          </label>

          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

export default Register;

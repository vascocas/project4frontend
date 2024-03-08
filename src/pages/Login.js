import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";

import "./Login.css";

function Login() {
    const updateUser = userStore((state) => state.updateName);
    const updateToken = userStore((state) => state.updateToken);
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = inputs;
    
        try {
            const response = await fetch('http://localhost:8080/project4vc/rest/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': username,
                    'password': password,
                }
            });
    
            if (!response.ok) {
                throw new Error('Login failed');
            }
    
            // Get the token value as a string
            const tokenValue = await response.text();
    
            // Update user and token
            updateUser(username);
            updateToken(tokenValue);
    
            navigate('/Home', { replace: true });
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
        }
    }
    
    

    return (
        <div className="Login" id="profile-outer-container">
            <div className="page-wrap" id="login-page-wrap">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-fields">
                        <label htmlFor="username">Enter your username:</label>
                        <input type="text"
                            id="username"
                            name="username"
                            value={inputs.username}
                            onChange={handleChange}
                        />

                        <label htmlFor="password">Enter your password:</label>
                        <input type="password"
                            id="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="register-button">
                        <input type="submit" value="Login" />
                    </div>
                    
                    <br /><br />

                    <p>If you're not registered yet, register before logging in.</p>
                </form>
            </div>
        </div>
    );
}

export default Login;

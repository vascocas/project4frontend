import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import "./Login.css"; //

function Login() {
    const updateName = userStore((state) => state.updateName);
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = inputs;

        try {
            const response = await fetch('http://localhost:8080/my_activities_backend/rest/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': username,
                    'password': password, 
                },
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // On successful login, update the username in userStore
            updateName(username);
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
                    <div className="input-fields"> {/* Encapsulate input fields */}
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

                    <div className="register-button"> {/* Encapsulate register button */}
                        <input type="submit" value="Login" />
                    </div>
                    
                    {/* Add some space */}
                    <br /><br />

                    <p>If you're not registered yet, register before logging in.</p>
                </form>
            </div>
        </div>
    );
}

export default Login;

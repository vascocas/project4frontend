import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";
import "./Register.css"; //

function Register() {
    const updateName = userStore((state) => state.updateName);
    const [inputs, setInputs] = useState({ username: "", password: "", email: "", name: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password, email, name } = inputs;

        try {
            const response = await fetch('http://localhost:8080/my_activities_backend/rest/user/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email, name })
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            // On successful registration, update the username in userStore
            updateName(username);
            alert('Successful Register');
            navigate('/Login', { replace: true }); // Navigate to Login page after successful registration
        } catch (error) {
            console.error('Error registering:', error);
            alert('Registration failed. Please try again.');
        }
    }

    return (
        <div className="Register" id="register-outer-container">
            <div className="page-wrap" id="register-page-wrap">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label>Enter your username:
                        <input type="text"
                            name="username"
                            value={inputs.username}
                            onChange={handleChange}
                        />
                    </label>

                    <label>Enter your password:
                        <input type="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                        />
                    </label>

                    <label>Enter your email:
                        <input type="email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                        />
                    </label>

                    <label>Enter your name:
                        <input type="text"
                            name="name"
                            value={inputs.name}
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

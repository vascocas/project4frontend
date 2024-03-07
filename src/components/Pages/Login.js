import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore";

function Login() {
    const updateName = userStore((state) => state.updateName);
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = inputs;

        try {
            const response = await fetch('http://localhost:8080/my_activities_backend/rest/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify content type
                },
                body: JSON.stringify({ // Send data in the request body as JSON
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Assuming successful login, update the username in userStore
            updateName(email);
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
                    <label>Enter your email:
                        <input type="email"
                            name="email"
                            value={inputs.email}
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
                    <input type="submit" value="Login" />
                    <p>If you're not registered yet, register before logging in.</p>
                </form>
            </div>
        </div>
    );
}

export default Login;

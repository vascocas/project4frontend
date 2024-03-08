import React from "react";
import Sidebar from '../components/navbar/Sidebar';
import { userStore } from "../stores/UserStore";

import '../index.css';

function Home() {
    const { username, token, updateName, updateToken } = userStore();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/project4vc/rest/users/logout', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            updateName(""); // Clear username
            updateToken(""); // Clear token
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Logout failed. Please try again.');
        }
    }

    return (
        <div className="Home" id="home-outer-container">
            <Sidebar pageWrapId={'home-page-wrap'} outerContainerId={'home-outer-container'} />
            <div className="page-wrap" id="home-page-wrap"> 
                <h1>Welcome {username}</h1>
                <h2>Home</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Home;

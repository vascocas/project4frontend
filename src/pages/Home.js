import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import Sidebar from '../components/navbar/Sidebar';
import { userStore } from "../stores/UserStore";

import '../index.css';

function Home() {
    const { username, token, updateName, updateToken } = userStore();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getAllTasks = async () => {
            try {
                const response = await fetch('http://localhost:8080/project4vc/rest/tasks/all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                    },
                });

                if (response.ok) {
                    const tasks = await response.json();
                    setTasks(tasks);
                } else {
                    const message = await response.text();
                    alert(message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to fetch tasks. Please try again.");
            }
        };

        getAllTasks();
    }, [token]); // Make sure to include token as a dependency to trigger the effect when it changes

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
            <Header user={username} onLogout={handleLogout} />
            <Sidebar pageWrapId={'home-page-wrap'} outerContainerId={'home-outer-container'} />
            <div className="page-wrap" id="home-page-wrap"> 
                <h1>Scrum Board</h1>
                <div className="task-columns">
                    {/* Render task columns */}
                    <TaskColumn title="TODO" tasks={tasks.filter(task => task.state === "TODO")} />
                    <TaskColumn title="DOING" tasks={tasks.filter(task => task.state === "DOING")} />
                    <TaskColumn title="DONE" tasks={tasks.filter(task => task.state === "DONE")} />
                </div>
            </div>
        </div>
    );
}

// TaskColumn component to render tasks within a column
function TaskColumn({ title, tasks }) {
    return (
        <div className="task-column">
            <h2>{title}</h2>
            <ul>
                {/* Render tasks */}
                {tasks.map(task => (
                    <TaskCard key={task.taskId} title={task.title} priority={task.priority} />
                ))}
            </ul>
        </div>
    );
}

// TaskCard component to render individual task cards
function TaskCard({ title, priority }) {
    // Determine priority class
    let priorityClass = "";
    if (priority === 100) {
        priorityClass = "low-priority";
    } else if (priority === 300) {
        priorityClass = "medium-priority";
    } else if (priority === 500) {
        priorityClass = "high-priority";
    }

    return (
        <ul className={`card ${priorityClass}`}>
            <div className="card-header">{title}</div>
            {/* Add more card content here if needed */}
        </ul>
    );
}

export default Home;
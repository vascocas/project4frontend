import React, { useState, useEffect } from "react";
import '../index.css';
import Header from "../components/Header";
import Sidebar from '../components/navbar/Sidebar';
import { userStore } from "../stores/UserStore";

function Activity() {
    const { username } = userStore();
    const [activities, setActivities] = useState([]);
    const [inputs, setInputs] = useState({});
    const [newactivity, setNewActivity] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/my_activities_backend/rest/activity/all', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'token': 'coi9bA0gEPiqqUN-9FYdilCGNLnvBQo0'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally handle error state or display an error message
            }
        };

        fetchData();
    }, [newactivity]); // Empty dependency array ensures the effect runs only once

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/my_activities_backend/rest/activity/add', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'token': 'coi9bA0gEPiqqUN-9FYdilCGNLnvBQo0'
            },
            body: JSON.stringify(inputs)
        })
        .then(function (response) {
            if (response.status === 200) {
                setNewActivity(inputs);
            } else {
                alert('Something went wrong :(');
            }
        });
    };

    return (
        <div className="Activity" id="activity-outer-container">
            <Header />
            <Sidebar pageWrapId={'activity-page-wrap'} outerContainerId={'activity-outer-container'} />
            <div className="page-wrap" id="activity-page-wrap">
              <h1>Add a New Task</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Activity Title:
                            <input
                                type="text"
                                name="title"
                                defaultValue=""
                                onChange={handleChange}
                            />
                        </label>
                        <label>Activity Description:
                            <input
                                type="text"
                                name="description"
                                defaultValue=""
                                onChange={handleChange}
                            />
                        </label>
                        <input type="submit" value="Add" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Activity;

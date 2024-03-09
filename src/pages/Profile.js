import React from "react";
import Header from "../components/Header";
import Sidebar from '../components/navbar/Sidebar';
import '../index.css';
import { userStore } from "../stores/UserStore";

function Profile() {
    const { username } = userStore();

    return (
        <div className="Profile" id="profile-outer-container">
            <Header />
            <Sidebar pageWrapId={'profile-page-wrap'} outerContainerId={'profile-outer-container'} />
            <div className="page-wrap" id="profile-page-wrap"> 
                <h1>My Profile</h1>
                <p>Welcome {username}</p>
            </div>
        </div>
    );
}

export default Profile;

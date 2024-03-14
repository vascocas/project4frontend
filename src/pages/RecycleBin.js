// RecycleBin.js

import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/navbar/Sidebar";
import { useNavigate } from "react-router-dom";
import TaskRecycle from "../components/tasks/TaskRecycle";
import UserRecycle from "../components/users/UserRecycle";
import "../index.css";
import "./RecycleBin.css";

const RecycleBin = () => {
  const navigate = useNavigate();

  return (
    <div className="container" id="recycle-outer-container">
      <Header />
      <Sidebar
        pageWrapId={"recycle-page-wrap"}
        outerContainerId={"recycle-outer-container"}
      />
      <main>
        <h1 className="page-title">Recycle Bin</h1>
        <div className="recycle-content">
          <div className="recycle-column">
            <h2>Deleted Tasks</h2>
            <div className="taskRecycle-container">
              <TaskRecycle />
            </div>
          </div>
          <div className="recycle-column">
            <h2>Deleted Users</h2>
            <div className="userRecycle-container">
              <UserRecycle />
            </div>
          </div>
        </div>
        <div className="homeMenu-button-container">
          <button onClick={() => navigate("/Home")}>Back to Scrum Board</button>
        </div>
      </main>
    </div>
  );
};

export default RecycleBin;
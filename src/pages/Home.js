import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/navbar/Sidebar";
import AddTaskForm from "../components/AddTaskForm";
import TasksBoard from "../components/TasksBoard";
import { userStore } from "../stores/UserStore";
import "../index.css";
import "./Home.css";

function Home() {
  const { username } = userStore();

  return (
    <div className="Home" id="home-outer-container">
      <Header user={username} />
      <Sidebar
        pageWrapId={"home-page-wrap"}
        outerContainerId={"home-outer-container"}
      />
      <div className="page-wrap" id="home-page-wrap">
        <h1 className="page-title">Scrum Board</h1>
        <div className="content-wrapper">
          <div className="add-task-form">
            <AddTaskForm />
          </div>
          <div className="tasks-board">
            <TasksBoard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

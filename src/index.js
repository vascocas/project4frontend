import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Task from './pages/Task'
import Profile from './pages/Profile'
import UserManagment from './pages/UserManagment'
import TaskCategories from './pages/TaskCategories'
import RecycleBin from './pages/RecycleBin'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route index element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<Home />} />
      <Route path="/task" element={<Task />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user" element={<UserManagment />} />
      <Route path="/categories" element={<TaskCategories />} />
      <Route path="/recycle" element={<RecycleBin />} />
      
    </Routes>
  </Router>
);
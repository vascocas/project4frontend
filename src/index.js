import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Task from './pages/Task'
import Profile from './pages/Profile'
   

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
    <Routes>
      <Route index element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/task" element={<Task />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  </React.StrictMode>
);

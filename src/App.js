import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const togglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="App" id="outer-container">
      <div className="page-wrap" id="app-page-wrap">
        <h1>Welcome to this Application</h1>
        {isLoginPage ? <Login /> : <Register />}
        <button onClick={togglePage}>
          {isLoginPage ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { userStore } from "./stores/UserStore";

function App() {
  const { isLoginPage, setIsLoginPage } = userStore(); // Retrieve isLoginPage from UserStore

  const togglePage = () => {
    setIsLoginPage((prevIsLoginPage) => !prevIsLoginPage); // Toggle the isLoginPage state
  };
  
  return (
    <div className="App" id="outer-container">
      <div className="page-wrap" id="app-page-wrap">
        <h1>Welcome to Scrum Board</h1>
        {isLoginPage ? <Login /> : <Register />}
        <button onClick={togglePage}>
          {isLoginPage ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default App;

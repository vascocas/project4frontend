import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header>
      <div>Welcome, {user}</div>
      <button onClick={onLogout}>Logout</button>
    </header>
  );
};

export default Header;

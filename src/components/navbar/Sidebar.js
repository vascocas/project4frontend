import React from "react";
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

const Sidebar = (props) => {
    return (
        <Menu>
            <a className="menu-item" href="/home">Home</a>
            <a className="menu-item" href="/profile">Profile</a>
            <a className="menu-item" href="/profileUsers">Users Profile</a>
            <a className="menu-item" href="/user">User Managment</a>
            <a className="menu-item" href="/categories">Task Categories</a>
            <a className="menu-item" href="/recycle">Recicle Bin</a>
        </Menu>
    );
};

export default Sidebar;

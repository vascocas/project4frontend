import React from "react";
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

const Sidebar = (props) => {
    return (
        <Menu>
            <a className="menu-item" href="/home">Home</a>
            <a className="menu-item" href="/task">Tasks</a>
            <a className="menu-item" href="/profile">Profile</a>
        </Menu>
    );
};

export default Sidebar;

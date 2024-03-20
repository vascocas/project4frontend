import React from "react";
import { slide as Menu } from 'react-burger-menu';
import { userStore } from "../../stores/UserStore";
import './Sidebar.css';

const Sidebar = (props) => {
    const { role } = userStore(state => state);

    return (
        <Menu>
            <a className="menu-item" href="/home">Home</a>
            <a className="menu-item" href="/profile">Profile</a>
            {role === "PRODUCT_OWNER" && (<a className="menu-item" href="/user">User Managment</a>)}
            <a className="menu-item" href="/categories">Task Categories</a>
            <a className="menu-item" href="/recycle">Recicle Bin</a>
        </Menu>
    );
};

export default Sidebar;

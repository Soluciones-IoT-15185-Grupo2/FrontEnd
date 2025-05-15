import React from "react";
import  "./navbar.css";
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handlerLogoutClick = () => {
        navigate("/login");
    }

    return (

        <nav className="navbar">
            <div className="navbar-logo">GloveTalk</div>
            <ul className="navbar-links">
                <li><a href="#traductor">Traductor</a></li>
                <li><a href="#historial">Historial</a></li>
                <button className = "logout" onClick={handlerLogoutClick}>LogOut</button>
            </ul>
        </nav>
    )
}

export default Navbar;

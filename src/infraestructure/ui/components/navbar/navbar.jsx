import React from "react";
import  "./navbar.css";
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handlerLogoutClick = () => {
        navigate("/login");
    }

    const handlerHistoryClick = () => {
        navigate("/history");
    }

    const handlerTraductorClick = () => {
        navigate("/home");
    }

    return (

        <nav className="navbar">
            <div className="navbar-logo">GloveTalk</div>
            <ul className="navbar-links">
                <li><a href="#traductor" onClick={handlerTraductorClick}>Traductor</a></li>
                <li><a href="#historial" onClick={handlerHistoryClick}>Historial</a></li>
                <button className = "logout" onClick={handlerLogoutClick}>LogOut</button>
            </ul>
        </nav>
    )
}

export default Navbar;

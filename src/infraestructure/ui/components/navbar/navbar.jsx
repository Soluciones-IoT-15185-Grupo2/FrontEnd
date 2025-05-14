import React from "react";
import  "./navbar.css";

const Navbar = () => {

    return (

        <nav className="navbar">
            <div className="navbar-logo">GloveTalk</div>
            <ul className="navbar-links">
                <li><a href="#traductor">Traductor</a></li>
                <li><a href="#historial">Historial</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;

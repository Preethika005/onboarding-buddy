import React from "react";
import "../css/Navbar.css";

import {
    FaSearch,
    FaBell,
    FaEnvelope
} from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="navbar">

            <div className="searchBox">
                <FaSearch className="searchIcon" />

                <input
                    type="text"
                    placeholder="Search employees, departments..."
                />
            </div>

            <div className="navRight">

                <div className="iconBox">
                    <FaBell />
                    <span className="badge">3</span>
                </div>

                <div className="iconBox">
                    <FaEnvelope />
                    <span className="badge">5</span>
                </div>

                <div className="profile">

                    <img
                        // src="https://i.pravatar.cc/150?img=32"
                        alt="profile"
                    />

                    <div>
                        <h4>Preethika</h4>
                        <p>HR Manager</p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Navbar;
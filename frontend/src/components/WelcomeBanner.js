import React from "react";
import "../css/WelcomeBanner.css";
import astroImage from "../assets/astro.jpeg";

import { FaArrowRight } from "react-icons/fa";

const WelcomeBanner = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="welcomeBanner">

            <div className="bannerLeft">

                <p className="greeting">
                    👋 Good Morning
                </p>

                <h1>
                    Welcome back,
                    <span> {user?.full_name || "HR"}!</span>
                </h1>

                <p className="subtitle">
                    Manage employees, onboarding and company resources
                    from one beautiful dashboard.
                </p>

                <button onClick={()=>window.location.href="/addEmployee"} className="addEmployeeBtn">

                    Add Employee

                    <FaArrowRight/>

                </button>

            </div>

            <div className="bannerRight">

                <img
                    src={astroImage}
                    alt="Salesforce Astro"
                />

            </div>

        </div>

    );

};

export default WelcomeBanner;
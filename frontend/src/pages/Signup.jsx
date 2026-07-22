import React, { useState } from "react";
import "../css/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        hrId: "",
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const response = await axios.post(

                "http://localhost:5000/signup",

                formData

            );

            alert(response.data.message);

            navigate("/");

        }

        catch(err){

            alert(err.response.data.message);

        }

        // Backend API will be connected here later.
    };

    return (

        <div className="sf-login-page">

            {/* Left Side */}

            <div className="sf-form-section">

                <div className="sf-form-container">

                    <div className="sf-logo-wrapper">

                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"
                            alt="Salesforce Logo"
                            className="sf-main-logo"
                        />

                    </div>

                    <h1 className="sf-welcome-title">
                        Create HR Account 👨‍💼
                    </h1>

                    <p className="sf-welcome-subtitle">
                        Register using the HR ID provided by your organization.
                    </p>

                    <form
                        className="sf-actual-form"
                        onSubmit={handleSubmit}
                    >

                        {/* HR ID */}

                        <div className="sf-input-wrapper">

                            <label>HR ID</label>

                            <div className="sf-input-field-container">

                                <input
                                    type="text"
                                    name="hrId"
                                    placeholder="Enter HR ID"
                                    value={formData.hrId}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Name */}

                        <div className="sf-input-wrapper">

                            <label>Full Name</label>

                            <div className="sf-input-field-container">

                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter Full Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Email */}

                        <div className="sf-input-wrapper">

                            <label>Official Email</label>

                            <div className="sf-input-field-container">

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Official Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Phone */}

                        <div className="sf-input-wrapper">

                            <label>Phone Number</label>

                            <div className="sf-input-field-container">

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Password */}

                        <div className="sf-input-wrapper">

                            <label>Password</label>

                            <div className="sf-input-field-container">

                                <input

                                    type={showPassword ? "text" : "password"}

                                    name="password"

                                    placeholder="Enter Password"

                                    value={formData.password}

                                    onChange={handleChange}

                                    required

                                />

                                <button

                                    type="button"

                                    className="sf-password-toggle"

                                    onClick={() => setShowPassword(!showPassword)}

                                >

                                    👁

                                </button>

                            </div>

                        </div>

                        {/* Confirm Password */}

                        <div className="sf-input-wrapper">

                            <label>Confirm Password</label>

                            <div className="sf-input-field-container">

                                <input

                                    type={showConfirmPassword ? "text" : "password"}

                                    name="confirmPassword"

                                    placeholder="Confirm Password"

                                    value={formData.confirmPassword}

                                    onChange={handleChange}

                                    required

                                />

                                <button

                                    type="button"

                                    className="sf-password-toggle"

                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}

                                >

                                    👁

                                </button>

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="sf-submit-btn"
                        >
                            Create Account
                        </button>

                    </form>

                    <div className="sf-signup-section">

                        <p>

                            Already have an account?

                            <span
                                className="sf-signup-link"
                                onClick={() => navigate("/")}
                            >

                                Login

                            </span>

                        </p>

                    </div>

                </div>

            </div>

            {/* Right Side */}

            <div className="sf-hero-section">

                <div className="sf-hero-text-content">

                    <h2 className="sf-hero-title">
                        Welcome HR ✨
                    </h2>

                    <p className="sf-hero-subtitle">
                        Manage employees, onboarding tasks, resources and notifications from one place.
                    </p>

                </div>

                <div className="sf-graphic-artboard">

                    <img

                        src="https://www.salesforce.com/blog/wp-content/uploads/sites/2/2025/06/TBC_BlogBanner_1500x844_V2.png?w=889"

                        alt="Hero"

                        className="sf-hero-scenery-fallback"

                    />

                </div>

            </div>

        </div>

    );

};

export default Signup;
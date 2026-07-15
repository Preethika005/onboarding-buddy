import React, { useState } from 'react';
import '../css/Dashboard.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";//npm install react-router-dom

const Dashboard = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit =async (e) => {
     e.preventDefault();

    try {

        const response = await axios.post(
            "http://localhost:5000/login",
            {
                email: username,
                password: password
            }
        );

        const user = response.data.user;

        if (user.role === "HR") {
            navigate("/hr");
        }

        else if (user.role === "MANAGER") {
            navigate("/manager");
        }

        else if (user.role === "EMPLOYEE") {
            navigate("/employee");
        }

    } catch (err) {

        alert("Invalid Credentials");

    }
  };

  return (
    <div className="sf-login-page">
      {/* LEFT COLUMN: FORM SECTION */}
      <div className="sf-form-section">
        <div className="sf-form-container">
          
          {/* Salesforce Brand Cloud Logo */}
          <div className="sf-logo-wrapper">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" 
              alt="Salesforce Logo" 
              className="sf-main-logo"
            />
          </div>

          <h1 className="sf-welcome-title">Welcome Back! <span className="wave-emoji">👋</span></h1>
          <p className="sf-welcome-subtitle">Log in to your Salesforce account and explore your world.</p>

          <form onSubmit={handleSubmit} className="sf-actual-form">
            {/* Username Field */}
            <div className="sf-input-wrapper">
              <label htmlFor="username">Username</label>
              <div className="sf-input-field-container">
                <svg className="sf-input-icon icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input 
                  type="text" 
                  id="username" 
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="sf-input-wrapper">
              <label htmlFor="password">Password</label>
              <div className="sf-input-field-container">
                <svg className="sf-input-icon icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="sf-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <svg className="sf-input-icon icon-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Options */}
            {/* <div className="sf-form-options">
              <label className="sf-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="sf-forgot-link">Forgot Password?</a>
            </div> */}

            {/* Main Action Button */}
            <button type="submit" className="sf-submit-btn">
              <span>Log In</span>
              <svg className="sf-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>

          {/* Social / Single Sign-On Divider */}
          {/* <div className="sf-divider">
            <span className="sf-divider-text">Or log in with</span>
          </div> */}

          {/* Identity Providers / SSO Buttons */}
          {/* <div className="sf-sso-container">
            <button className="sf-sso-btn" aria-label="Log in with Google">
              <svg className="sso-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </button>
            <button className="sf-sso-btn" aria-label="Log in with Microsoft">
              <svg className="sso-icon" viewBox="0 0 23 23">
                <path fill="#f35325" d="M0 0h11v11H0z"/>
                <path fill="#81bc06" d="M12 0h11v11H12z"/>
                <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                <path fill="#ffba08" d="M12 12h11v11H12z"/>
              </svg>
            </button>
            <button className="sf-sso-btn" aria-label="Log in with Slack">
              <svg className="sso-icon" viewBox="0 0 24 24">
                <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042z"/>
                <path fill="#36C5F0" d="M8.823 5.043a2.528 2.528 0 0 1-2.52-2.52A2.528 2.528 0 0 1 8.823 0a2.528 2.528 0 0 1 2.52 2.522v2.521h-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522V8.824a2.528 2.528 0 0 1 2.522-2.52h5.043z"/>
                <path fill="#2EB67D" d="M18.958 8.824a2.528 2.528 0 0 1 2.522-2.52 2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.522h-2.522V8.824zm-1.261 0a2.528 2.528 0 0 1-2.52 2.522h-5.043a2.528 2.528 0 0 1-2.522-2.522V3.78a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043z"/>
                <path fill="#ECB22E" d="M15.177 18.957a2.528 2.528 0 0 1 2.52 2.522 2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.522h2.522zm0-1.261a2.528 2.528 0 0 1-2.522-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z"/>
              </svg>
            </button>
          </div> */}

          {/* Form Footer */}
          <p className="sf-form-footer">
            {/* New to Salesforce? <a href="#admin" className="sf-admin-link">Contact your HR</a> */}
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: BRANDED ILLUSTRATION HERO HERO */}
      <div className="sf-hero-section">
        <div className="sf-hero-text-content">
          <h2 className="sf-hero-title">Hello, Trailblazer! <span className="sparkle-emoji">✨</span></h2>
          <p className="sf-hero-subtitle">One login. Unlimited possibilities.<br />Let's build the future together.</p>
        </div>

        {/* Main Backdrop Illustration Graphics Layout 
          Replace the background image link with your own asset source URL if desired.
        */}
        <div className="sf-graphic-artboard">
          <img 
            src="https://www.salesforce.com/blog/wp-content/uploads/sites/2/2025/06/TBC_BlogBanner_1500x844_V2.png?w=889" 
            alt="Scenic Background Placeholder" 
            className="sf-hero-scenery-fallback"
          />
          {/* Visual simulation overlay for Astro and the goat character placements */}
          <div className="character-composition-overlay">
             {/* If you have individual assets, place them here */}
          </div>
        </div>

        {/* Security / Compliance Badge Lower Center */}
        {/* <div className="sf-security-badge">
          <svg className="badge-shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="badge-text">Secure. Reliable. Powered by Salesforce.</span>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
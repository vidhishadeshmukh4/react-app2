// src/components/NavigationPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/styles.css'; 
import logo from '../images/logo.jpeg'; // Ensure this path is correct and file exists

const NavigationPage = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any authentication tokens or local storage
        localStorage.removeItem('token'); // Ensure 'token' is the correct key
        setIsLoggedOut(true);
        setTimeout(() => {
            navigate('/');
        }, 2000); // Redirect after 2 seconds
    };

    return (
        <div className="navigation-container">
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav className="navbar">
                    <Link to="/home"><b>Home</b></Link>
                    <Link to="/alerts"><b>Alerts</b></Link>
                    <Link to="/dashboard"><b>Dashboard</b></Link>
                    <Link to="/products"><b>Manage Products</b></Link>
                    <Link to="/staff"><b>Staff</b></Link>
                    <a href="#logout" onClick={handleLogout}><b>Logout</b></a>
                </nav>
                <div className="admin">
                    <span><h3>Hi Admin</h3></span>
                </div>
            </header>
            {isLoggedOut && (
                <div className="logout-message">
                    <div className="message-content">
                        <span className="tick-mark">✔</span>
                        Logged out successfully
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavigationPage;

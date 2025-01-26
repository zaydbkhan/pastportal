//import './style.css'; // Ensure the correct CSS file path
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
const SignIn = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here (e.g., file upload logic)
        console.log("Form submitted");
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign In</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input">
                        <input type="text" placeholder="Username" required />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Password" required />
                    </div>
                </div>
                <div className="submit-container">
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;

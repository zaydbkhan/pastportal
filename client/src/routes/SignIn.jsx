//import './style.css'; // Ensure the correct CSS file path
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
const SignIn = () => {

    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign In</div>
            </div>
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
        </div>
    );
};

export default SignIn;

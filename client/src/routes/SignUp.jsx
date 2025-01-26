//import './style.css'; 
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const SignUp = () => {
    const [emailToValidate, setEmail] = useState("")

    // const validateEmail = async () => {
    //     setIsLoading(true);
    //     setError(null);
    //     try {
    //         const response = await fetch('http://localhost:8000/verify_email', { //local host 800 is what django hosts, and to get it, it calls api/waypoints
    //             method: 'POST',
    //             credentials: "include",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: emailToValidate
    //             })
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);

    //         }

    //         const data = await response.json();
    //         const stringifiedData = JSON.stringify(data, null, 2); // Pretty print JSON
    //         setReturnValue(stringifiedData);
    //     } catch (error) {
    //         console.error('Error fetching waypoints:', error);
    //         setError(error.message);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     validateEmail()
    // }, [])

    return (
        <div className="container">
            <div className="header">
                <div className="text">SignUp</div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" placeholder="Username" required />
                </div>
                <div className="input">
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
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

export default SignUp;

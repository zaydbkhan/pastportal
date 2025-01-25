import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import logo from '../logo.svg';
import '../App.css';

const Home = () => {
    const [returnValue, setReturnValue] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPosts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/waypoints/', {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);

            }

            const data = await response.json();
            const stringifiedData = JSON.stringify(data, null, 2); // Pretty print JSON
            setReturnValue(stringifiedData);
        } catch (error) {
            console.error('Error fetching waypoints:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <button 
                    onClick={fetchPosts}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Click here'}
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <input 
                    type="text" 
                    style={{ width: '440px', height: '500px' }} 
                    value={returnValue} 
                    id="username" 
                    name="username"   
                    onChange={(e) => setReturnValue(e.target.value)}
                /> 
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
};

export default Home;

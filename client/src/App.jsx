import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './routes/Home';
import LoginSignup from './routes/LoginSignup';
import theLogo from './images/ppLogo.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'; // Add this import for Leaflet CSS

import logoImg from '../src/images/pastportal_logo.jpg';

function App() {

  const defaultIcon = new Icon({
    iconUrl:
      'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [45, 45],
    iconAnchor: [22.5, 45],
    popupAnchor: [0, -45],
  });

  const sampData = [
    {
      postId: 1,
      latitude: 34.052235,
      longitude: -118.243683,
      name: "Cafe Aroma",
      address: "123 Coffee St, Los Angeles, CA",
      rating: 4.5,
      views: 150
    },
    {
      postId: 2,
      latitude: 34.040713,
      longitude: -118.246769,
      name: "Brew Haven",
      address: "456 Java Ave, Los Angeles, CA",
      rating: 4.8,
      views: 200
    },
    {
      postId: 3,
      latitude: 34.052250,
      longitude: -118.255600,
      name: "Espresso Express",
      address: "789 Latte Blvd, Los Angeles, CA",
      rating: 4.3,
      views: 120
    },
    {
      postId: 4,
      latitude: 34.048927,
      longitude: -118.258540,
      name: "Cuppa Bliss",
      address: "321 Mocha Ln, Los Angeles, CA",
      rating: 4.7,
      views: 180
    },
    {
      postId: 5,
      latitude: 34.058315,
      longitude: -118.246819,
      name: "Steamy Brews",
      address: "654 Cappuccino Rd, Los Angeles, CA",
      rating: 4.6,
      views: 220
    }
  ];

  return (
    <Router>
      <link href="https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&display=swap" rel="stylesheet"></link>

      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="main">
                  <div className="title">
                    <div className = "area">
                      <div className = "flex-direction-column">
                        <div className="logoTitle">
                          <img src={logoImg} alt="PastPortal" width="250" height="210"></img>
                          <div className="middle">
                            <p id="logoText">PastPortal</p>
                            <input className="searchBar" style={{width: '40vw', height: '30px'}} type="text" placeholder="Enter a location here..." />
                          </div>    
                          </div>
                       
                      </div>
                      <div className="buttons">
                          <div className="button-wrapper">
                            <button onClick={() => window.location.href = '/home'} className="SignButton" id="Upload">Upload</button>
                          </div>
                          <div className="button-wrapper">
                            <button onClick={() => window.location.href = '/home'} className="SignButton" id="SignIn">Sign In</button>
                          </div>

                          <div className="button-wrapper">
                            <button onClick={() => window.location.href = '/home'} className="SignButton" id="SignUp">Sign Up</button>
                          </div>
                      </div>
                    </div>
                  </div>
                </header>
                  <div className="main">
                    <div className="theMap" style={{width: '75vw', height: '70vh'}}>
                      <MapContainer
                        center={[34.02235633613326, -118.28512377318303]}
                        zoom={15}
                        scrollWheelZoom={true}
                        style={{ width: '100%', height: '100%' }}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {sampData.map((post) => (
                          <Marker
                            key={post.postId}
                            position={[post.latitude, post.longitude]}
                            icon={defaultIcon}
                          >
                            <Popup>
                              <div>
                                <h3 style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '30px' }}> {post.name}</h3>
                                <img
                                  src={'https://i.ibb.co/HHgB7Cm/cafe-Image.webp'}
                                  alt={post.name}
                                  style={{ width: '100%', height: '100%' }}
                                  onError={(e) => { e.target.src = 'https://i.ibb.co/HHgB7Cm/cafe-Image.webp'; }}
                                />
                                <p> Description: Image of my cafe</p>
                                <p>Date: 12/14</p>

                                <Link to={`/post/${post.postId}`}>
                                  <button
                                    style={{
                                      backgroundColor: '#581c14',
                                      fontFamily: '"Courier New", Courier, monospace',
                                      fontWeight: 'bold',
                                      border: 'none',
                                      cursor: 'pointer',
                                      color: '#cee7f1',
                                      borderRadius: '4px',
                                      padding: '3px',
                                      fontSize: '13px'
                                    }}
                                  >
                                    Upload images
                                  </button>
                                </Link>
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </div>
                  </div>
              </>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

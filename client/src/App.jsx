import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';

import theLogo from './images/ppLogo.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'; // Add this import for Leaflet CSS

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logoImg from '../src/images/pastportal_logo.jpg';

function App() {
  const [waypoint, setWaypoint] = useState(0);
  const [searching, setReturnValue] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [allWayPoints, setAllWayPoints] = useState([]);
  const [imagesArray, setImagesArray] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {

    const setLocation = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('http://localhost:8000/return_location', { 
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        if (data.latitude && data.longitude) {
          const stringifiedData = JSON.stringify(data, null, 2); 
          setReturnValue(stringifiedData);
        } else {
          throw new Error('Invalid data structure returned from the server');
        }
    
      } catch (error) {
        console.error('Error fetching location:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    useEffect(() => {
      setLocation(); 
    }, []);
    

    const fetchImages = async (waypointId) => {
      try {
        const response = await fetch(`http://localhost:8000/api/images/?waypoint=${waypointId}`, {
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
        setImagesArray(prev => ({
          ...prev,
          [waypointId]: data
        }));

      } catch (error) {
        console.error('Error fetching images for waypoint', waypointId, ':', error);
      }
    };

    const fetchWaypoints = async () => {
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
        setAllWayPoints(data);

        // Fetch images for each waypoint
        data.forEach(waypoint => {
          fetchImages(waypoint.id);
        });

      } catch (error) {
        console.error('Error fetching waypoints:', error);
      }
    };

    fetchWaypoints();
  }, []);

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="custom-arrow custom-prev" onClick={onClick}>
        &#9664; {/* Left arrow character */}
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="custom-arrow custom-next" onClick={onClick}>
        &#9654; {/* Right arrow character */}
      </button>
    );
  };

  const SlickCarousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />,
    };

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
                      <div className="area">
                        <div className="flex-direction-column">
                          <div className="logoTitle">
                            <img src={logoImg} alt="PastPortal" width="250" height="210"></img>
                            <div className="middle">
                              <p id="logoText">PastPortal</p>
                              <input className="searchBar" style={{ width: '40vw', height: '30px' }} type="text" placeholder="Enter a location here..." />
                            </div>
                          </div>

                        </div>
                        <div className="buttons">
                          <div className="button-wrapper">
                            <button onClick={() => window.location.href = '/home'} className="SignButton" id="Upload">Upload</button>
                          </div>
                          <div className="button-wrapper">
                            <button onClick={() => window.location.href = '/signin'} className="SignButton" id="SignIn">Sign In</button>
                          </div>

                          <div className="button-wrapper">
                            <button onClick={() => window.location.href = '/signup'} className="SignButton" id="SignUp">Sign Up</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
                  <div className="main">
                    <div className="theMap" style={{ width: '75vw', height: '70vh' }}>
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
                        {allWayPoints.map((wp) => (
                          <Marker
                            key={wp.id}
                            position={[wp.latitude, wp.longitude]}
                            icon={defaultIcon}
                          >
                            <Popup>
                              <div>
                                <h3 style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '30px' }}>{wp.name}</h3>
                                <Slider {...settings}>
                                  {imagesArray[wp.id]?.map((item, index) => (
                                    <div key={index} className="slide">
                                      <img src={item.embed_link} alt={`Slide ${index}`} style={{ width: '100px', height: '100px' }} />
                                      <p>{item.description}</p>
                                    </div>
                                  ))}
                                </Slider>
                                <p>Date: 12/14</p>

                                <Link to={`/post/${wp.id}`}>
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
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    );
  };

  return <SlickCarousel />;
}

export default App;

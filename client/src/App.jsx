import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import Upload from './routes/Upload';

import theLogo from './images/ppLogo.png';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'; // Add this import for Leaflet CSS

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logoImg from '../src/images/pastportal_logo.jpg';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

function App() {
  const [waypoint, setWaypoint] = useState(0);
  const [searching, setReturnValue] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [allWayPoints, setAllWayPoints] = useState([]);
  const [imagesArray, setImagesArray] = useState({});
  const [clickMarker, setClickMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [mapNorthEastLat, setMapNorthEastLat] = useState(33.65981731927518);
  const [mapNorthEastLng, setMapNorthEastLng] = useState(-117.81798362731935);
  const [mapSouthWestLat, setMapSouthWestLat] = useState(33.638525394029216);
  const [mapSouthWestLng, setMapSouthWestLng] = useState(-117.86664962768556);

  const testCoord = {
    latitude: "34.058315",
    longitude: "-118.246819",
  }



  const postImage = async (embed_link, description, waypoint, create_dt, update_dt) => {
    try {
        const response = await fetch('http://localhost:8000/api/images/', {
            method: 'POST',
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "embed_link": embed_link,
                "description": description,
                "waypoint": waypoint,
                "create_dt": create_dt,
                "update_dt": update_dt
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error posting waypoints:', error);
    }
  };

  const postWaypoint = async (latitude, longitude, create_dt, update_dt) => {
    try {
        const response = await fetch('http://localhost:8000/api/waypoints/', {
            method: 'POST',
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "latitude": latitude,
                "longitude": longitude,
                "create_dt": create_dt,
                "update_dt": update_dt
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting waypoints:', error);
    }
  };




  useEffect(() => {
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

  //use effect ends here

  const MapEvents = ({ coords }) => {
    const map = useMap();
    
    useEffect(() => {
      if (coords) {
        map.setView([parseFloat(coords.latitude), parseFloat(coords.longitude)], 15);
      }
    }, [coords, map]);

    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const mapBounds = map.getBounds()
        setMapNorthEastLat(mapBounds.getNorth())
        setMapNorthEastLng(mapBounds.getEast())
        setMapSouthWestLat(mapBounds.getSouth())
        setMapSouthWestLng(mapBounds.getWest())
        setClickMarker({
          latitude: lat,
          longitude: lng,
          isOpen: true
        });
      }
    });
    
    return null;
  };

  const getCurrentISO = () => {
    const now = new Date();
    return now.toISOString().slice(0, -5) + "Z";
  };
  
  const handleSearch = () => {
    setMapCenter(testCoord);
  }


  const handleCreatingWaypoint = async () => {
    if (clickMarker) {
      const newWaypoint = await postWaypoint(clickMarker.latitude, clickMarker.longitude, getCurrentISO(), getCurrentISO());
      if (newWaypoint) {
        setAllWayPoints(prev => [...prev, newWaypoint]);
        setImagesArray(prev => ({
          ...prev,
          [newWaypoint.id]: []
        }));
        setClickMarker(null);
      }
    }
  }


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
                              <input 
                                className="searchBar" 
                                style={{ width: '40vw', height: '30px' }} 
                                type="text" 
                                placeholder="Enter a location here..."
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSearch();
                                  }
                                }}
                              />
                            </div>
                          </div>

                        </div>
                        <div className="buttons">
                          <div className="button-wrapper">
                            <button onClick={() => window.location.href = '/upload'} className="SignButton" id="Upload">Upload</button>
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
                    <div className="theMap" style={{ width: '75vw', height: '69vh' }}>
                      <MapContainer
                        bounds={[[mapNorthEastLat,mapNorthEastLng], [mapSouthWestLat, mapSouthWestLng]]}
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
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                        {clickMarker && (
                          <Marker
                            position={[clickMarker.latitude, clickMarker.longitude]}
                            icon={defaultIcon}
                            eventHandlers={{
                              add: (e) => {
                                e.target.openPopup();
                              }
                            }}
                          >
                            <Popup>
                              <div>
                                <button onClick={handleCreatingWaypoint} className="CreateWPButton">Create Waypoint</button>
                              </div>
                            </Popup>
                          </Marker>
                        )}
                        <MapEvents coords={mapCenter} />
                      </MapContainer>
                    </div>
                  </div>
                </>
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </Router>
    );
  };

  return <SlickCarousel />;
}

export default App;

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
  const [waypoint, setWaypoint] = useState(null); // Changed to track current waypoint ID
  const [searching, setReturnValue] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [allWayPoints, setAllWayPoints] = useState([]);
  const [imagesArray, setImagesArray] = useState({});
  const [clickMarker, setClickMarker] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);
  const [mapNorthEastLat, setMapNorthEastLat] = useState(33.65981731927518);
  const [mapNorthEastLng, setMapNorthEastLng] = useState(-117.81798362731935);
  const [mapSouthWestLat, setMapSouthWestLat] = useState(33.638525394029216);
  const [mapSouthWestLng, setMapSouthWestLng] = useState(-117.86664962768556);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const testCoord = {
    latitude: "34.058315",
    longitude: "-118.246819",
  }

  const firebaseConfig = {
    apiKey: "AIzaSyCrtAfPxAd-CSFRqCqjEpl1VNqaH_-Gr0s",
    authDomain: "pastportal-ea656.firebaseapp.com",
    projectId: "pastportal-ea656",
    storageBucket: "pastportal-ea656.firebasestorage.app",
    messagingSenderId: "279867975697",
    appId: "1:279867975697:web:693a7f91b5041ca34769b0",
    measurementId: "G-1LDP7VQ9T5"
  };

  const googleMapsKey = "AIzaSyBieYvORigS57fyS4lLLd71ePzYrqYJ0qA";



  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);




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
  }, [refreshTrigger]);

  //use effect ends here

  const MapEvents = ({ coords }) => {
    const map = useMap();

    useEffect(() => {
      if (coords) {
        const { latitude, longitude, bounds } = coords;
        if (bounds) {
          map.fitBounds([
            [bounds.north, bounds.east],
            [bounds.south, bounds.west]
          ]);
        } else {
          map.flyTo([parseFloat(latitude), parseFloat(longitude)], 15, {
            duration: 2 // Duration of animation in seconds
          });
        }
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

  

  const handleSearch = async () => {
    const searchInput = document.querySelector('.searchBar').value;
    if (!searchInput) return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchInput)}&key=${googleMapsKey}`
      );

      const data = await response.json();
      console.log(data);

      if (data.status === 'OK' && data.results.length > 0) {
        const firstResult = data.results[0];
        const location = firstResult.geometry.location;
        const bounds = firstResult.geometry.bounds;

        setSearchLocation({
          latitude: location.lat.toString(),
          longitude: location.lng.toString(),
          bounds: bounds ? {
            north: bounds.northeast.lat,
            south: bounds.southwest.lat,
            east: bounds.northeast.lng,
            west: bounds.southwest.lng
          } : null
        });

        setClickMarker(null);

      } else {
        console.log('No results found, using default coordinates');
        setSearchLocation(testCoord);
        setClickMarker(null);

      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      setSearchLocation(testCoord);
      setClickMarker(null);

    }
  };

  const handleUploadingImages = async (e) => {
    if (!e || !e.target) {
      console.error("Event object is invalid");
      return;
    }

    e.preventDefault();

    const fileInput = e.target.querySelector('input[type="file"]');
    const descriptionInput = e.target.querySelector('textarea');

    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
      console.error("No file selected");
      return;
    }

    let url;
    const file = fileInput.files[0];

    const uploadImage = async (file) => {
      const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    };

    try {
      url = await uploadImage(file);
      console.log("Files uploaded. Accessible URLs:", url);
    } catch (error) {
      console.error("Error uploading images:", error);
      return;
    }

    const iso = getCurrentISO();
    const description = descriptionInput ? descriptionInput.value : '';

    try {
      await postImage(url, description, waypoint, iso, iso);
      e.target.reset();
      
      setRefreshTrigger(prev => prev + 1);
      setShowUploadModal(false);
      
      // Reload page after everything is updated
      setTimeout(() => {
        window.location.reload();
      }, 500); // Small delay to ensure all state updates are processed
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
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
        setWaypoint(newWaypoint.id);
        setClickMarker(null);
      }

      const url = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${clickMarker.latitude},${clickMarker.longitude}&fov=80&heading=70&pitch=0&key=AIzaSyBieYvORigS57fyS4lLLd71ePzYrqYJ0qA`
      const iso = getCurrentISO();
      const descrip = "place"
      await postImage(url, descrip, newWaypoint.id, iso, iso);
      
      // Trigger refresh and reload after everything is updated
      setRefreshTrigger(prev => prev + 1);
      setTimeout(() => {
        window.location.reload();
      }, 500); // Small delay to ensure all state updates are processed
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

  const UploadModal = ({ onClose, waypoint }) => {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: '#fadda3',
          padding: '20px',
          borderRadius: '8px',
          width: '500px',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
              border: 'none',
              background: 'none',
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          <form onSubmit={handleUploadingImages}>
            <h2 style={{ color: '#581c14',marginTop: '20px' }}>Upload Images</h2>
            <div style={{ marginTop: '20px' }}>
              <input style={{ color: '#581c14'}} type="file" multiple accept="image/*" required />
              <textarea
                name="description"
                placeholder="Add description..."
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '8px',
                  height: '100px'
                }}
                required
              />
              <button
                className="SignButton"
                type="submit"
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#581c14',
                  color: '#f58120',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const SlickCarousel = () => {
    const settings = {
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

    return (
      <Router>
        <link href="https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&display=swap" rel="stylesheet"></link>
        <div className="App">
          {showUploadModal && (
            <UploadModal
              onClose={() => setShowUploadModal(false)}
              waypoint={selectedWaypoint}
            />
          )}
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
                              <p style= {{color:"#581c14"}}id="logoText">PastPortal</p>
                              <input
                                className="searchBar"
                                style={{ width: '40vw', height: '30px' , border: '2px solid',borderRadius: '10px', borderColor: '#ff9e17'}}
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
                        <div className="buttons" style={{left:"40px"}}>

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
                        bounds={[[mapNorthEastLat, mapNorthEastLng], [mapSouthWestLat, mapSouthWestLng]]}
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
                            <Popup style={{ width: "400px", height: "auto", padding: "10px", backgroundRepeat: "no-repeat" }}>
                              <div>
                                {imagesArray[wp.id]?.length === 1 ? (
                                  <div className="slide" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "10px", backgroundRepeat: "no-repeat" }}>
                                    <img
                                      src={imagesArray[wp.id][0].embed_link}
                                      alt="Single image"
                                      style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }}
                                    />
                                    <p>{imagesArray[wp.id][0].description}</p>
                                  </div>
                                ) : (
                                  <Slider {...{
                                    ...settings,
                                    arrows: imagesArray[wp.id]?.length > 1
                                  }}>
                                    {imagesArray[wp.id]?.map((item, index) => (
                                      <div key={index} className="slide" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2px", backgroundRepeat: "no-repeat" }}>
                                        <img
                                          src={item.embed_link}
                                          alt={`Slide ${index}`}
                                          style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }}
                                        />
                                        <p>{item.description}</p>
                                      </div>
                                    ))}
                                  </Slider>
                                )}

                                <button
                                  onClick={() => {
                                    setSelectedWaypoint(wp);
                                    setWaypoint(wp.id); // Update current waypoint when upload button is clicked
                                    setShowUploadModal(true);
                                  }}
                                  style={{
                                    backgroundColor: '#581c14',
                                    fontFamily: '"Courier New", Courier, monospace',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#cee7f1',
                                    borderRadius: '4px',
                                    padding: '3px',
                                    fontSize: '13px',
                                    justifyItems: 'center'
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
                        <MapEvents coords={searchLocation} />
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

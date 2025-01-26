import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
const Upload = () => {

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

    const handleSubmit = (e) => {
        e.preventDefault();
        var iso = new Date().toISOString()
        postImage("https://github.com/zaydbkhan/pastportal/tree/main", e.target.description.value, 1, iso, iso)
        e.target.reset()
        console.log("Form submitted");
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Upload</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input">
                        <input name="imgfile" type="file" accept="image/*" placeholder="Image" required />
                    </div>
                    <div className="input">
                        <input name="description" type="text" placeholder="Description" required />
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
export default Upload;

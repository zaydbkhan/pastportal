import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
const Upload = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here (e.g., file upload logic)
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
                        <input type="file" accept="image/*" placeholder="Image" required />
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Location" required />
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Description" required />
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

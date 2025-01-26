import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Upload = () => {

    return (
        <div className="container">
            <div className="header">
                <div className="text">Upload</div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="file" accept="image/*" placeholder="Image" required />
                </div>
                <div className="input">
                    <input type="text" placeholder="Location" required />
                </div>
            </div>
        </div>
    );
};

export default Upload;

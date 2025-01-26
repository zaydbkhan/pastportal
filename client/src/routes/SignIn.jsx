import React from 'react';
import './style.css'; // Ensure the correct CSS file path

const SignIn = () => {
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

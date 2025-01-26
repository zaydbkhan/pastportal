import React from 'react';
import './style.css'; 


const SignUp = () => {
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
                    <input type="email" placeholder="Email" required />
                </div>
                <div className="input">
                    <input type="password" placeholder="Password" required />
                </div>
            </div>
            <div className="submit-container">
                <button type="submit" className="submit-button">
                    Submit
                </button> //in the submit func, call the api and redirect based on that 
            </div>
        </div>
    );
};


export default Signup;

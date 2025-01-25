import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

const Home = () => {

    const [returnValue, setReturnValue] = useState("");

    const fetchPosts = async () => {
        //setReturnValue("stringifiedData");
        try {
          const response = await fetch('http://localhost:8080/post/all', {
            method: 'GET'
          }
          );
          const data = await response.json();
          if (response.ok) {
            const stringifiedData = JSON.stringify(data);
            setReturnValue(stringifiedData);
          }
        } catch (error) {
          console.error('Error during getting post:', error);
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
                    
                    onClick={() => {
                        fetchPosts();
                    }}
                  >Click here</button>
                

        <input type="text" style= {{width:'440px', height: '500px' }}value={returnValue} id="username" name="username"/> 
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

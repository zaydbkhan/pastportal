
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './routes/Home';



function App() {



  return (

    <Router>

      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="" style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <div className="window">
                <div className="typewriter">
                    <p>PastPortal</p>
                  </div>
                  <div className="main">
                    <div className="">
                      <Link to="/home">
                        <button className=""  style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }} id="sign">Sign In</button>
                      </Link>
                      
                      <Link to="/home">
                        <button className=""  style={{ marginRight: '10px', borderRadius: '30px', color: 'white' }} id="guest">Sign Up</button>
                      </Link>
                    </div>

                  </div>
                </div>
                </div>
              </>
            }
          />
          <Route path="/home" element={<Home />} />




        </Routes>
      </div>
    </Router>

  );
}



export default App;

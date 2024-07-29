import React from 'react';
import './HomePage.css';
import home from '../img/home.png';

const HomePage = () => {
  return (
    <div className="HomePage" style={{ home: `url(${home})`, home: 'cover' }}>
      <div className="content">
        <h1>Welcome to the MIS</h1>
        <p>CEYLINE GROUP PVT LTD</p>
      </div>
    </div>
  );
}

export default HomePage;

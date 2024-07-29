import React from 'react';
import { Link } from 'react-router-dom';
import './Super.css';

const Super = () => {
  return (
    <div className="home">
      <div className="super-container">
        <h2>Ship Agency Services</h2>
        <ul>
          <li>
            <Link to="/oceanlist">Oceaneeds</Link>
          </li>
          <li>
            <Link to="/cmslist">CMS</Link>
          </li>
          <li>
            <Link to="/cmllist">CML</Link>
          </li>
          <li>
            <Link to="/callist">CAL Agency</Link>
          </li>
          <li>
            <Link to="/nvocclist">CAL NVOCC</Link>
          </li>
          <li>
            <Link to="/ceslist">CES</Link>
          </li>
        </ul>
      </div>

      <div className="super-container">
        <h2>Logistics & Supply Chain</h2>
        <ul>
          <li>
            <Link to="/califolist">Califolink</Link>
          </li>
          <li>
            <Link to="/starlist">Starlink</Link>
          </li>
          <li>
            <Link to="/mstslist">MSTS</Link>
          </li>
          <li>
            <Link to="/ccslist">Cey Container</Link>
          </li>
          <li>
            <Link to="/cwslist">Ceyline Warehouse</Link>
          </li>
          <li>
            <Link to="/csvlist">Cargo Server</Link>
          </li>
        </ul>
      </div>

      <div className="super-container">
        <h2>Manning</h2>
        <ul>
          <li>
            <Link to="/csllist">Ceyline Shipping</Link>
          </li>
          <li>
            <Link to="/mcmlist">Mercantile Marine</Link>
          </li>
          <li>
            <Link to="/cmalist">CMA Ships</Link>
          </li>
        </ul>
      </div>

      <div className="super-container">
        <h2>Other</h2>
        <ul>
          <li>
            <Link to="/ctllist">Ceyline Travels</Link>
          </li>
          <li>
            <Link to="/chelist">Ceymed</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Super;

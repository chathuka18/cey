import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Sign out logic
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      navigate('/');
    } else {
      // Redirect to login page
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Home</Link>
        </div>
        <button onClick={handleAuthAction} className="auth-button">
          {isLoggedIn ? 'Sign Out' : 'Sign In'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

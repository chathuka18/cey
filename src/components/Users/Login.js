import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to check if the token is expired
  const isTokenExpired = () => {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (tokenExpiry && new Date().getTime() > tokenExpiry) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      return true; // Token is expired
    }
    return false; // Token is not expired
  };

  // Function to clear previous tokens
  const clearPreviousToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  };

  // Check token expiry on component mount
  useEffect(() => {
    if (isTokenExpired()) {
      console.log('Token has expired and was removed.');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Clear previous tokens before logging in
    clearPreviousToken();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      const { token, role, message, name, expiresIn, statusCode } = response.data;

      if (statusCode === 200) {
        const tokenExpiry = new Date().getTime() + expiresIn * 1000; // Set token expiration in ms

        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('tokenExpiry', tokenExpiry); // Store token expiry time

        const roleRoutes = {
          'ADMIN': '/admin',
          'CMS': '/cms',
          'CTL': '/ctl',
          'ONL': '/onl',
          'CML': '/cml',
          'MSTS': '/msts',
          'CLL': '/cll',
          'STL': '/stl',
          'CCS': '/ccs',
          'CSL': '/csl',
          'MCM': '/mcm',
          'CMA': '/cma',
          'CSV': '/csv',
          'CWS': '/cws',
          'CES': '/ces',
          'CAL': '/cal',
          'CHE': '/che',
          'NVOCC': '/nvocc',

          'SUPER': '/super',

          'cmsUpdate': '/cmsUpdate',
          'ctlUpdate': '/ctlUpdate',
          'onlUpdate': '/onlUpdate',
          'cmlUpdate': '/cmlUpdate',
          'mstsUpdate': '/mstsUpdate',
          'cllUpdate': '/cllUpdate',
          'stlUpdate': '/stlUpdate',
          'ccsUpdate': '/ccsUpdate',
          'cslUpdate': '/cslUpdate',
          'mcmUpdate': '/mcmUpdate',
          'cmaUpdate': '/cmaUpdate',
          'csvUpdate': '/csvUpdate',
          'cwsUpdate': '/cwsUpdate',

          'cesUpdate': '/cesUpdate',
          'calUpdate': '/calUpdate',
          'cheUpdate': '/cheUpdate',
          'nvoccUpdate': '/nvoccUpdate',
        };

        const route = roleRoutes[role] || '/'; // Default to home if role is not found
        navigate(route);
      } else {
        setError(message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center md:w-1/2 px-4 md:px-20 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4 text-center">CEYLINE MIS</h1>
        <p className="text-lg md:text-2xl text-center text-blue-400">WHAT WE DO, INSPIRES</p>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
        <div className="w-full">
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            {error && <div className="text-red-600 text-center text-sm mb-4">{error}</div>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

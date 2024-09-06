import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      const { token, role, message, name } = response.data;

      if (response.data.statusCode === 200) {
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        switch (role) {
          case 'ADMIN': navigate('/admin'); break;
          case 'CMS': navigate('/cms'); break;
          case 'CTL': navigate('/ctl'); break;
          case 'ONL': navigate('/onl'); break;
          case 'CML': navigate('/cml'); break;
          case 'MSTS': navigate('/msts'); break;
          case 'CLL': navigate('/cll'); break;
          case 'STL': navigate('/stl'); break;
          case 'CCS': navigate('/ccs'); break;
          case 'CSL': navigate('/csl'); break;
          case 'MCM': navigate('/mcm'); break;
          case 'CMA': navigate('/cma'); break;
          case 'CSV': navigate('/csv'); break;
          case 'CWS': navigate('/cws'); break;
          case 'CES': navigate('/ces'); break;
          case 'CAL': navigate('/cal'); break;
          case 'CHE': navigate('/che'); break;
          case 'NVOCC': navigate('/nvocc'); break;
          case 'SUPER': navigate('/super'); break;

          case 'onlUpdate': navigate('/onlUpdate'); break;

          default: navigate('/');
        }
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

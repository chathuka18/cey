import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import login from '../../img/login.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      const { token, role, message } = response.data;

      if (response.data.statusCode === 200) {
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);

        switch(role) {
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
    <div
      className="login-page"
      style={{ backgroundImage: `url(${login})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="login-container">
        <h2>Welcome Back</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

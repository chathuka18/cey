import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const ROLES = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'ONL', label: 'Oceaneeds' },
  { value: 'CMS', label: 'Ceyline Maritime Services ' },
  { value: 'CML', label: 'CML	Ships' },
  { value: 'CAL', label: 'CAL Agency' },
  { value: 'NVOCC', label: 'CAL NVOCC' },
  { value: 'CES', label: 'Ceyline Engienering' },
  { value: 'CLL', label: 'Califolink' },
  { value: 'STL', label: 'Starlink One' },
  { value: 'MSTS', label: 'MSTS' },
  { value: 'CCS', label: 'Cey Container' },
  { value: 'CWS', label: 'Ceyline Warehouse' },
  { value: 'CSV', label: 'Cargo Server' },
  { value: 'CSL', label: 'Ceyline Shipping' },
  { value: 'MCM', label: 'Mercantile Marine' },
  { value: 'CMA', label: 'CMA Ships' },
  { value: 'CTL', label: 'Ceyline Travels' },
  { value: 'CHE', label: 'Ceymed Healthcare Services' },
  { value: 'SUPER', label: 'S Admin' },

  { value: 'onlUpdate', label: 'Oceaneeds Update' }
];

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    city: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.city) errors.city = 'City is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formData);
        if (response.data.statusCode === 200) {
          setSubmitMessage('Registration successful!');
          // Reset form after successful registration
          setFormData({
            email: '',
            password: '',
            name: '',
            city: '',
            role: ''
          });
        } else {
          setSubmitMessage(response.data.message || 'Registration failed. Please try again.');
        }
      } catch (error) {
        setSubmitMessage(error.response?.data?.message || 'Registration failed. Please try again.');
      }
      setIsSubmitting(false);
    }
  };
 return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              {ROLES.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Registering...' : 'Create Account'}
          </button>
        </form>
        {submitMessage && (
          <p className={`submit-message ${submitMessage.includes('successful') ? 'success' : 'error'}`}>
            {submitMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
  
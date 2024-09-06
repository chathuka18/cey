import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateOceaneed = ({ idToUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    no_of_operations: '',
    no_of_quotations: '',
    no_of_confirmed_jobs: '',
    success_rate: '',
    new_principles_tap_added: '',
    date: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (idToUpdate) {
      fetchOceaneedData();
    }
  }, [idToUpdate]);

  const fetchOceaneedData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/oceaneeds/${idToUpdate}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Failed to load the data for update.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/oceaneeds/${idToUpdate}`, formData);
      setMessage('Oceaneeds data updated successfully!');
      onClose();  // Close the update form after successful submission
    } catch (error) {
      console.error('Error updating data:', error);
      setMessage('Error updating data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Oceaneeds Data</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                {key.replace(/_/g, ' ')}:
              </label>
              <input
                type={key === 'date' ? 'date' : 'text'}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </form>
        {message && <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default UpdateOceaneed;

import React, { useState } from 'react';
import axios from 'axios';

const AddCSV = () => {
  const [csv, setCsv] = useState({
    id: '',
    sea_freight: '',
    air_freight: '',
    logistics_job: '',
    date: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCsv({ ...csv, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/csv`, {
        id: csv.id,
        sea_freight: csv.sea_freight,
        air_freight: csv.air_freight,
        logistics_job: csv.logistics_job,
        date: csv.date,
      });
      setSuccess('CSV added successfully!');
      setError(null);
      setCsv({
        id: '',
        sea_freight: '',
        air_freight: '',
        logistics_job: '',
        date: '',
      });
    } catch (error) {
      console.error('There was an error adding the CSV!', error);
      if (error.response && error.response.status === 409) {
        setError('A record with this ID already exists. Please use a different ID.');
      } else {
        setError('There was an error adding the CSV!');
      }
      setSuccess(null);
    }
  };

  return (
    <div className="cargo p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="form-container max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Cargo Server</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID (CSVyymmww) eg(CSV240101):
            </label>
            <input
              type="text"
              name="id"
              value={csv.id}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sea Freight TEU's:
            </label>
            <input
              type="number"
              name="sea_freight"
              value={csv.sea_freight}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Air Freight KGs:
            </label>
            <input
              type="number"
              name="air_freight"
              value={csv.air_freight}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logistics Jobs:
            </label>
            <input
              type="number"
              name="logistics_job"
              value={csv.logistics_job}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input type="date" name="date" value={csv.date} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Add CSV
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCSV;

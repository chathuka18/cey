import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CSVList = () => {
  const [csv, setCSV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCSV();
  }, []);

  const fetchCSV = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/csv`);
      setCSV(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/csv/${id}`);
      fetchCSV();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

  return (
    <div className="csv-list p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Cargo Server Data</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sea Freight TEU's</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Air Freight KGs</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Logistics Jobs</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {csv.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.sea_freight}</td>
                    <td className="px-4 py-2">{item.air_freight}</td>
                    <td className="px-4 py-2">{item.logistics_job}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-white-500 hover:text-gray-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSVList;

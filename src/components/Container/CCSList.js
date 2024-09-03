import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CCSList = () => {
  const [ccs, setCCS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCCS();
  }, []);

  const fetchCCS = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ccs`);
      setCCS(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/ccs/${id}`);
      fetchCCS();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100">
    <div className="company-list p-6  min-h-screen flex items-center justify-center">
      <div className="section max-w-5xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">CCS Data</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p className="text-center text-blue-500">Loading...</p>
        ) : (
          <div className="subsection overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Avg Gate Movement (Per Day)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Avg Storage - Laden (Per Day)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Avg Storage - Empty (Per Day)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Avg Refer Containers (Per Day)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Repairs (USD)</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ccs.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.gate_movement}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.storage_laden}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.storage_empty}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.refer_container}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.repairs_usd}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.date}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
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
    </div>
  );
};

export default CCSList;

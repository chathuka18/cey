import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CMLList = () => {
  const [cml, setCML] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCML();
  }, []);

  const fetchCML = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cml`);
      setCML(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/cml/${id}`);
      fetchCML();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">CML Data</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-gray-200 border-b border-gray-300">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Ship / Boat Management</th>
                  <th className="py-2 px-4 text-left">Flag State Ops</th>
                  <th className="py-2 px-4 text-left">P&I Endorsements</th>
                  <th className="py-2 px-4 text-left">Oluwil Project Income</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cml.map((item) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="py-2 px-4">{item.id}</td>
                    <td className="py-2 px-4">{item.ship_boat}</td>
                    <td className="py-2 px-4">{item.flag_state}</td>
                    <td className="py-2 px-4">{item.endorsement}</td>
                    <td className="py-2 px-4">{item.oluwil}</td>
                    <td className="py-2 px-4">{item.date}</td>
                    <td className="py-2 px-4">
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

export default CMLList;

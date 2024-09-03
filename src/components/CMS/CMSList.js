import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CMSList = () => {
  const [cms, setCMS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCMS();
  }, []);

  const fetchCMS = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cms`);
      setCMS(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/cms/${id}`);
      fetchCMS();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

  return (
    <div className="company-list p-6 bg-gray-100 min-h-screen">
      <div className="section max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="section-title text-2xl font-bold mb-4 text-center">CMS Data</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border-b text-left">ID</th>
                  <th className="px-4 py-2 border-b text-left">Launch Hires: From Casual Caller (Foreign)</th>
                  <th className="px-4 py-2 border-b text-left">Launch Hires: From Agent (Local)</th>
                  <th className="px-4 py-2 border-b text-left">Casual Caller Ops</th>
                  <th className="px-4 py-2 border-b text-left">Agency Network</th>
                  <th className="px-4 py-2 border-b text-left">New Principles Tap/ Added</th>
                  <th className="px-4 py-2 border-b text-left">Date</th>
                  <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cms.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{item.id}</td>
                    <td className="px-4 py-2 border-b">{item.foreign_hires}</td>
                    <td className="px-4 py-2 border-b">{item.local}</td>
                    <td className="px-4 py-2 border-b">{item.caller_ops}</td>
                    <td className="px-4 py-2 border-b">{item.agency_network}</td>
                    <td className="px-4 py-2 border-b">{item.new_principles_tap_added}</td>
                    <td className="px-4 py-2 border-b">{item.date}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

export default CMSList;

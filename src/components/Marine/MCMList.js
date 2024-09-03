import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MCMList = () => {
  const [mcm, setMCM] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMCM();
  }, []);

  const fetchMCM = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/mcm`);
      setMCM(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/mcm/${id}`);
        fetchMCM();
      } catch (error) {
        console.error('Error deleting data:', error);
        setError('Failed to delete entry. Please try again.');
      }
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">MCM Data</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Crew On Board</th>
                <th className="px-4 py-2 border-b">New Principals</th>
                <th className="px-4 py-2 border-b">Income per COB</th>
                <th className="px-4 py-2 border-b">Cost Per C.O.B</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mcm.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{item.id}</td>
                  <td className="px-4 py-2 border-b">{item.crew_on_board}</td>
                  <td className="px-4 py-2 border-b">{item.new_principals}</td>
                  <td className="px-4 py-2 border-b">{item.income}</td>
                  <td className="px-4 py-2 border-b">{item.cost}</td>
                  <td className="px-4 py-2 border-b">{item.date}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MCMList;

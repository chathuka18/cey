import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CMSList = () => {
  const [cms, setCMS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    fetchCMS();
  }, []);

  const fetchCMS = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cms`, { timeout: 10000 });
      // const response = await axios.get('http://localhost:8080/api/cms')
      const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setCMS(sortedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        setError(`Failed to fetch data: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        setError('Failed to fetch data: No response received from server');
      } else {
        setError(`Failed to fetch data: ${error.message}`);
      }
      setLoading(false);
    }
  };

  const handleRowClick = (record) => {
    setUpdateData({ ...record });
    setUpdateMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const submitUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/cms/${updateData.id}`, updateData);
      setUpdateMode(false);
      fetchCMS();
      alert('Record updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update record. Please try again.');
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">CMS Data</h2>
        <button
          onClick={fetchCMS}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Refresh
        </button>
        {updateMode ? (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Update Record</h3>
            {Object.keys(updateData).map((key) =>
              key !== 'id' ? (
                <div key={key} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    {key.replace(/_/g, ' ')}
                  </label>
                  <input
                    type={key === 'date' ? 'date' : 'number'}
                    name={key}
                    value={updateData[key]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>
              ) : null
            )}
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setUpdateMode(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={submitUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
              >
                Submit Update
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  {['Launch Hires: From Casual Caller (Foreign)', 'Launch Hires: From Agent (Local)', 'Casual Caller Ops', 'Agency Network', 'New Principles Tap/ Added', 'Date'].map((field) => (
                    <th
                      key={field}
                      className="px-4 py-2 text-left text-gray-700"
                    >
                      {field.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cms.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(item)}
                  >
                    <td className="px-4 py-2 border-b">{item.foreign_hires}</td>
                    <td className="px-4 py-2 border-b">{item.local}</td>
                    <td className="px-4 py-2 border-b">{item.caller_ops}</td>
                    <td className="px-4 py-2 border-b">{item.agency_network}</td>
                    <td className="px-4 py-2 border-b">{item.new_principles_tap_added}</td>
                    <td className="px-4 py-2 border-b">{new Date(item.date).toLocaleDateString()}</td>
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

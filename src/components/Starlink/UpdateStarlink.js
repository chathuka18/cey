import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarlinkList = () => {
  const [starlink, setStarlink] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [updateMode, setUpdateMode] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    fetchStarlink();
  }, []);

  const fetchStarlink = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/starlink`, { timeout: 10000 });
      setStarlink(response.data);
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

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortField(field);
    setSortDirection(isAsc ? 'desc' : 'asc');
    const sortedData = [...starlink].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });
    setStarlink(sortedData);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleUpdate = () => {
    if (starlink.length === 0) return;
    const latestRecord = starlink.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
    setUpdateData({ ...latestRecord });
    setUpdateMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const submitUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/starlink/${updateData.id}`, updateData);
      setUpdateMode(false);
      fetchStarlink();
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
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Starlink Data</h2>
        <div className="mb-6 flex justify-between">
          <button
            onClick={fetchStarlink}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          >
            Refresh
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
            disabled={updateMode || starlink.length === 0}
          >
            Update Latest Record
          </button>
        </div>
        {updateMode ? (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Update Latest Record</h3>
            {Object.keys(updateData).map((key) => (
              <div key={key} className="mb-3">
                <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ')}</label>
                <input
                  type={key === 'date' ? 'date' : key === 'id' ? 'text' : 'number'}
                  name={key}
                  value={updateData[key]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  disabled={key === 'id'}
                  readOnly={key === 'id'}
                />
              </div>
            ))}
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
                  {['ID', 'Full Rigging', 'Polylining', 'Fumigation', 'Container Repairs', 'Container Spare Sales', 'Container Washing', 'GOH BD', 'Date'].map((field) => (
                    <th
                      key={field}
                      className="px-4 py-2 cursor-pointer text-left text-gray-700 hover:text-gray-900"
                      onClick={() => handleSort(field)}
                    >
                      {field.replace(/_/g, ' ')}
                      {sortField === field && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {starlink.map((item) => (
                    <tr key={item.id} className="odd:bg-white even:bg-gray-100">
                        <td className="p-2 border">{item.id}</td>
                        <td className="p-2 border">{item.full_rigging}</td>
                        <td className="p-2 border">{item.polylining}</td>
                        <td className="p-2 border">{item.fumigation}</td>
                        <td className="p-2 border">{item.container_repairs}</td>
                        <td className="p-2 border">{item.container_spare_sales}</td>
                        <td className="p-2 border">{item.container_washing}</td>
                        <td className="p-2 border">{item.goh_bd}</td>
                        <td className="p-2 border">{item.date}</td>
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

export default StarlinkList;

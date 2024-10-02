import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarlinkList = () => {
  const [starlink, setStarlink] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchStarlinkData();
  }, []);

  const fetchStarlinkData = async () => {
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/starlink/${id}`);
        fetchStarlinkData();
        alert('Entry deleted successfully');
      } catch (error) {
        console.error('Error deleting data:', error);
        setError('Failed to delete entry. Please try again.');
      }
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

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Starlink Data</h2>
        <button
          onClick={fetchStarlinkData}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Refresh
        </button>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                {['ID', 'Full Rigging', 'Polylining', 'Fumigation', 'Container Repairs', 'Container Spare Sales', ' Container Washing', 'GOH BD', 'Date'].map((field) => (
                  <th
                    key={field}
                    className="px-4 py-2 cursor-pointer text-left text-gray-700 hover:text-gray-900"
                    onClick={() => handleSort(field)}
                  >
                    {field.replace(/_/g, ' ')}
                    {sortField === field && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                  </th>
                ))}
                <th className="px-4 py-2 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {starlink.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.full_rigging}</td>
                  <td className="px-4 py-2">{item.polylining}</td>
                  <td className="px-4 py-2">{item.fumigation}</td>
                  <td className="px-4 py-2">{item.container_repairs}</td>
                  <td className="px-4 py-2">{item.container_spare_sales}</td>
                  <td className="px-4 py-2">{item.container_washing}</td>
                  <td className="px-4 py-2">{item.goh_bd}</td>
                  <td className="px-4 py-2">{formatDate(item.date)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
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

export default StarlinkList;

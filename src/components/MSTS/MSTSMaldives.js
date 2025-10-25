import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MSTSMaldives = () => {
  const [msts, setMSTS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [updateMode, setUpdateMode] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    fetchMSTS();
  }, []);

  const fetchMSTS = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/travel`, { timeout: 10000 });
      console.log("Fetched data:", response.data); // ✅ Debug: See exact JSON returned
      setMSTS(response.data);
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
    const sortedData = [...msts].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });
    setMSTS(sortedData);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleUpdate = (item) => {
    setUpdateData({ ...item });
    setUpdateMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const submitUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/travel/${updateData.id}`, updateData);
      setUpdateMode(false);
      fetchMSTS();
      alert('Record updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update record. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/travel/${id}`);
        fetchMSTS();
        alert('Record deleted successfully');
      } catch (error) {
        console.error('Error deleting record:', error);
        setError('Failed to delete record. Please try again.');
      }
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">MSTS - Maldives</h2>
        <div className="mb-6 flex justify-between">
          <button
            onClick={fetchMSTS}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {updateMode ? (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Update Record</h3>
            {Object.keys(updateData).map((key) => (
              <div key={key} className="mb-3">
                <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ')}</label>
                <input
                  type={key === 'date' ? 'date' : 'number'}
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
              <thead className="bg-blue-50">
                <tr>
                  {[
                    'Date',
                    'No. of Monthly Service',
                    'No. of PTI',
                    'No. of Spare Parts Supply',
                    'No. of Repairs',
                    'No. of Renting',
                    'No. of Inspection',
                  ].map((field) => (
                    <th
                      key={field}
                      className="px-4 py-2 cursor-pointer text-left text-gray-700 hover:text-gray-900"
                      onClick={() => handleSort(field)}
                    >
                      {field}
                      {sortField === field && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                  ))}
                  <th className="px-4 py-2 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {msts.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="px-4 py-2">{formatDate(item.date)}</td>
                    <td className="px-4 py-2">{item.tickets_Seafarer}</td>
                    <td className="px-4 py-2">{item.tickets_FIT_Corporate}</td>
                    <td className="px-4 py-2">{item.outbound}</td>
                    <td className="px-4 py-2">{item.inbound}</td>
                    <td className="px-4 py-2">{item.visa}</td>
                    <td className="px-4 py-2">{item.insurance}</td>
                    <td className="px-4 py-2 space-x-2">
                      
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
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

export default MSTSMaldives;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CMLList = () => {
  const [cml, setCML] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [updateMode, setUpdateMode] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    fetchCML();
  }, []);

  const fetchCML = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cml`, { timeout: 10000 });
      setCML(response.data);
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
    const sortedData = [...cml].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });
    setCML(sortedData);
  };

  const handleUpdate = () => {
    if (cml.length === 0) return;
    const latestRecord = cml.reduce((latest, current) => {
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
      await axios.put(`${process.env.REACT_APP_API_URL}/api/cml/${updateData.id}`, updateData);
      setUpdateMode(false);
      fetchCML();
      alert('Record updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update record. Please try again.');
    }
  };

  

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">CML Data</h2>
        <div className="mb-6 flex justify-between">
          <button
            onClick={fetchCML}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          >
            Refresh
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
            disabled={updateMode || cml.length === 0}
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
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-gray-200 border-b border-gray-300">
                  {['id', 'ship_boat', 'flag_state', 'endorsement', 'oluwil', 'date'].map((field) => (
                    <th
                      key={field}
                      className="py-2 px-4 text-left cursor-pointer"
                      onClick={() => handleSort(field)}
                    >
                      {field.replace(/_/g, ' ')}
                      {sortField === field && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                  ))}
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
                    <td className="py-2 px-4">{formatDate(item.date)}</td>
                    
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
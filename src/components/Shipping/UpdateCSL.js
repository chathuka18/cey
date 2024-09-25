import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CSLList = () => {
  const [csl, setCsl] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    fetchCSL();
  }, []);

  const fetchCSL = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/csl`);
      setCsl(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/csl/${id}`);
      fetchCSL();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

  const handleUpdate = () => {
    if (csl.length === 0) return;
    const latestRecord = csl.reduce((latest, current) => {
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
      await axios.put(`${process.env.REACT_APP_API_URL}/api/csl/${updateData.id}`, updateData);
      setUpdateMode(false);
      fetchCSL();
      alert('Record updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update record. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Shipping Data</h2>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <div className="mb-6 flex justify-between">
              <button
                onClick={fetchCSL}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
              >
                Refresh
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
                disabled={updateMode || csl.length === 0}
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
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-left text-gray-700">
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
                    {csl.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CSLList;

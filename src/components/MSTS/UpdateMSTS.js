import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MSTSList = () => {
  const [msts, setMSTS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    fetchMSTS();
  }, []);

  const fetchMSTS = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/msts`);
      setMSTS(response.data);
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/msts/${id}`);
        fetchMSTS();
      } catch (error) {
        console.error('Error deleting data:', error);
        setError('Failed to delete entry. Please try again.');
      }
    }
  };

  const handleUpdate = () => {
    if (msts.length === 0) return;
    const latestRecord = msts.reduce((latest, current) => {
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
      await axios.put(`${process.env.REACT_APP_API_URL}/api/msts/${updateData.id}`, updateData);
      setUpdateMode(false);
      fetchMSTS();
      alert('Record updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update record. Please try again.');
    }
  };

  
  const fieldLabels = {
    id: 'ID',
    pti: 'No. of PTI',
    monitoring_days: 'No. of Monitoring Days',
    fleet: 'Reefer Renting Fleet',
    owned_rent: 'On Hire Reefer – MSTS Owned',
    on_hire: 'Outsource Reefer – On Hire',
    re_work: 'Re-work Operations (No. of Jobs)',
    survey: 'Survey (No. of Jobs)',
    reefer_spare: 'No. of Reefer Spare Part Supplies',
    vessel_spare: 'No. of Vessel Spare Part Supplies',
    reefer_repairs: 'No. of Reefer Repairs',
    exports: 'No. of Perishable Exports',
    maldives: 'Maldives',
    date: 'Date'
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">MSTS Data</h2>
        <div className="mb-4 flex justify-between">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
            disabled={updateMode || msts.length === 0}
          >
            Update Latest Record
          </button>
        </div>
        {updateMode && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Update Latest Record</h3>
            {Object.keys(updateData).map((key) => (
              <div key={key} className="mb-3">
                <label className="block text-sm font-medium text-gray-700">{fieldLabels[key]}</label>
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
        )}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">No. of. PTI</th>
                <th className="px-4 py-2 border-b">No. of. Monitoring Days</th>
                <th className="px-4 py-2 border-b">Reefer Renting Fleet</th>
                <th className="px-4 py-2 border-b">On Hire Reefer – MSTS Owned</th>
                <th className="px-4 py-2 border-b">Out Source Reefer – On Hire</th>
                <th className="px-4 py-2 border-b">Re-work Operations (No. of. Jobs): </th>
                <th className="px-4 py-2 border-b">Survey (No. of. Jobs): </th>
                <th className="px-4 py-2 border-b">No. of Reefer Spare part supplies:</th>
                <th className="px-4 py-2 border-b">No. of Vessel Spare part supplies:</th>
                <th className="px-4 py-2 border-b">No. of. Reefer Repairs: </th>
                <th className="px-4 py-2 border-b">Exports</th>
                <th className="px-4 py-2 border-b">Maldives</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {msts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{item.id}</td>
                  <td className="px-4 py-2 border-b">{item.pti}</td>
                  <td className="px-4 py-2 border-b">{item.monitoring_days}</td>
                  <td className="px-4 py-2 border-b">{item.fleet}</td>
                  <td className="px-4 py-2 border-b">{item.owned_rent}</td>
                  <td className="px-4 py-2 border-b">{item.on_hire}</td>
                  <td className="px-4 py-2 border-b">{item.re_work}</td>
                  <td className="px-4 py-2 border-b">{item.survey}</td>
                  <td className="px-4 py-2 border-b">{item.reefer_spare}</td>
                  <td className="px-4 py-2 border-b">{item.vessel_spare}</td>
                  <td className="px-4 py-2 border-b">{item.reefer_repairs}</td>
                  <td className="px-4 py-2 border-b">{item.exports}</td>
                  <td className="px-4 py-2 border-b">{item.maldives}</td>
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
        
        {/* Table Section */}
      </div>
    </div>
  );
};

export default MSTSList;

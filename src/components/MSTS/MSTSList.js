import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MSTSList = () => {
  const [msts, setMSTS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">MSTS Data</h2>
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
                <th className="px-4 py-2 border-b">No. of Perishable Exports</th>
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
      </div>
    </div>
  );
};

export default MSTSList;

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
      const response = await axios.get('http://localhost:8080/api/msts');
      setMSTS(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/msts/${id}`);
      fetchMSTS();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };
    return (
    <div className="company-list">
      <div className="section">
        <h2 className="section-title">Oceaneeds Data</h2>
        <div className="subsection">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PTI</th>
                        <th>Monitoring Days</th>
                        <th>Fleet</th>
                        <th>Owned/Rent</th>
                        <th>On Hire</th>
                        <th>Re-work</th>
                        <th>Survey</th>
                        <th>Reefer Spare</th>
                        <th>Vessel Spare</th>
                        <th>Reefer Repairs</th>
                        <th>Exports</th>
                        <th>Maldives</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {msts.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.pti}</td>
                            <td>{item.monitoring_days}</td>
                            <td>{item.fleet}</td>
                            <td>{item.owned_rent}</td>
                            <td>{item.on_hire}</td>
                            <td>{item.re_work}</td>
                            <td>{item.survey}</td>
                            <td>{item.reefer_spare}</td>
                            <td>{item.vessel_spare}</td>
                            <td>{item.reefer_repairs}</td>
                            <td>{item.exports}</td>
                            <td>{item.maldives}</td>
                            <td>{item.date}</td>
                            <td>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CCSList = () => {
  const [ccs, setCCS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCCS();
  }, []);

  const fetchCCS = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ccs`);
      setCCS(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/ccs/${id}`);
      fetchCCS();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };
  return (
    <div className="company-list">
      <div className="section">
        <h2 className="section-title">CCS Data</h2>
        <div className="subsection">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Average Gate Movement (Per Day)</th>
                    <th>Average Storage -Laden (Per Day)</th>
                    <th>Average Storage -Empty (Per Day)</th>
                    <th>Average Refer Containers (Per Day)</th>
                    <th>Repairs (USD)</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {ccs.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.gate_movement}</td>
                        <td>{item.storage_laden}</td>
                        <td>{item.storage_empty}</td>
                        <td>{item.refer_container}</td>
                        <td>{item.repairs_usd}</td>
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
        
  )
}

export default CCSList;

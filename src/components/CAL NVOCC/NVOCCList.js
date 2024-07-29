import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NVOCCList = () => {
    const [nvocc, setNVOCC] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNVOCC();
    }, []);

    const fetchNVOCC = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/nvocc');
      setNVOCC(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/nvocc/${id}`);
      fetchNVOCC();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };


  return (
    <div className="company-list">
      <div className="section">
        <h2 className="section-title">CAL NVOCC Data</h2>
        <div className="subsection">
        
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Loading TEU's</th>
                    <th>Discharging TEU's</th>
                    <th>Transhipment Handling TEU's</th>
                    <th>Liner DO TEU's</th>
                    <th>Export BL TEU's</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {nvocc.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.loading}</td>
                        <td>{item.discharging}</td>
                        <td>{item.transhipment}</td>
                        <td>{item.liner}</td>
                        <td>{item.export}</td>
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

export default NVOCCList;

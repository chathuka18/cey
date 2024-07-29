import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CSVList = () => {
  const [csv, setCSV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCSV();
  }, []);

  const fetchCSV = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/csv');
      setCSV(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/csv/${id}`);
      fetchCSV();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

    return (
        <div className="company-list">
      <div className="section">
        <h2 className="section-title">Cargo Server Data</h2>
        <div className="subsection">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sea Freight TEU's</th>
                        <th>Air Frieght KGs</th>
                        <th>Logistics Jobs</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {csv.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.sea_freight}</td>
                            <td>{item.air_freight}</td>
                            <td>{item.logistics_job}</td>
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

export default CSVList;

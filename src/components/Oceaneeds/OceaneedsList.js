import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OceaneedsList.css';

const OceaneedsList = () => {
  const [oceaneeds, setOceaneeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOceaneeds();
  }, []);

  const fetchOceaneeds = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/oceaneeds');
      setOceaneeds(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/oceaneeds/${id}`);
      fetchOceaneeds();
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
                  <th>Operations</th>
                  <th>Quotations</th>
                  <th>Confirmed Jobs</th>
                  <th>Success Rate</th>
                  <th>New Principles</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {oceaneeds.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.no_of_operations}</td>
                    <td>{item.no_of_quotations}</td>
                    <td>{item.no_of_confirmed_jobs}</td>
                    <td>{item.success_rate}%</td>
                    <td>{item.new_principles_tap_added}</td>
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

export default OceaneedsList;
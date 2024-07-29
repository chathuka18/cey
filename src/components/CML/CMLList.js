import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CMLList = () => {
  const [cml, setCML] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCML();
  }, []);

  const fetchCML = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/cml');
      setCML(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cml/${id}`);
      fetchCML();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };
    return (
         <div className="company-list">
      <div className="section">
        <h2 className="section-title">CML Data</h2>
        <div className="subsection">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ship / Boat Management</th>
                        <th>Flag State Ops</th>
                        <th>P&I Endorsements</th>
                        <th>Oluwil Project Income</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cml.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.ship_boat}</td>
                            <td>{item.flag_state}</td>
                            <td>{item.endorsement}</td>
                            <td>{item.oluwil}</td>
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

export default CMLList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MCMList = () => {
  const [mcm, setMCM] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMCM();
  }, []);

  const fetchMCM = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/mcm`);
      setMCM(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/mcm/${id}`);
      fetchMCM();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };
    return (
    <div className="company-list">
      <div className="section">
        <h2 className="section-title">MCM Data</h2>
        <div className="subsection">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Crew On Board</th>
                        <th>New Principals</th>
                        <th>Income per COB</th>
                        <th>Cost Per C.O.B</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mcm.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.crew_on_board}</td>
                            <td>{item.new_principals}</td>
                            <td>{item.income}</td>
                            <td>{item.cost}</td>
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

export default MCMList;

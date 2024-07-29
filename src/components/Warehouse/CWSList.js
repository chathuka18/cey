import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CWSList = () => {
    const [cws, setCWS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCWS();
  }, []);

  const fetchCWS = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/cws');
      setCWS(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cws/${id}`);
      fetchCWS();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

    return (
    <div className="company-list">
      <div className="section">
        <h2 className="section-title">CWS Data</h2>
        <div className="subsection">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>WH 01- Capacity</th>
                        <th>WH 01- Utilization</th>
                        <th>WH 01- Utilization %n</th>
                        <th>WH 02- Capacity</th>
                        <th>WH 02- Utilization</th>
                        <th>WH 02- Utilization %</th>
                        <th>Value Added Services (LKR)</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cws.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.wh01_capacity}</td>
                            <td>{item.wh01_utilization}</td>
                            <td>{item.wh01_utilization_percentage}</td>
                            <td>{item.wh02_capacity}</td>
                            <td>{item.wh02_utilization}</td>
                            <td>{item.wh02_utilization_percentage}</td>
                            <td>{item.value_added_services}</td>
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

export default CWSList;

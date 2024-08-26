import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TravelList = () => {
  const [travel, setTravel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTravel();
  }, []);

  const fetchTravel = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/travel`);
      setTravel(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/travel/${id}`);
      fetchTravel();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

    return (
        <div className="company-list">
      <div className="section">
        <h2 className="section-title">Travels Data</h2>
        <div className="subsection">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tickets: Seafarer</th>
                        <th>Tickets: FIT/ Corporate</th>
                        <th>Outbound</th>
                        <th>Inbound</th>
                        <th>Visa</th>
                        <th>Insurance</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {travel.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.tickets_Seafarer}</td>
                            <td>{item.tickets_FIT_Corporate}</td>
                            <td>{item.outbound}</td>
                            <td>{item.inbound}</td>
                            <td>{item.visa}</td>
                            <td>{item.insurance}</td>
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

export default TravelList;

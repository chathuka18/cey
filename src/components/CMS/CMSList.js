import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CMSList = () => {
  const [cms, setCMS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCMS();
  }, []);

  const fetchCMS = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cms`);
      setCMS(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/cms/${id}`);
      fetchCMS();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };
  return (
    <div className="company-list">
      <div className="section">
        <h2 className="section-title">CMS Data</h2>
        <div className="subsection">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Launch Hires: From Casual Caller (Foreign)</th>
                    <th>Launch Hires: From Agent (Local)</th>
                    <th>Casual Caller Ops</th>
                    <th>Agency Network</th>
                    <th>New Principles Tap/ Added</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cms.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.foreign_hires}</td>
                        <td>{item.local}</td>
                        <td>{item.caller_ops}</td>
                        <td>{item.agency_network}</td>
                        <td>{item.new_principles_tap_added}</td>
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

export default CMSList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CALList = () => {

    const [cal, setCAL] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCAL();
    }, []);

    const fetchCAL = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/cal');
      setCAL(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cal/${id}`);
      fetchCAL();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

    return (
        <div className="company-list">
      <div className="section">
        <h2 className="section-title">CAL Agency Data</h2>
        <div className="subsection">
          <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Crew Change Total:</th>
                        <th>Casual Caller Ops:</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cal.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.crew_change}</td>
                            <td>{item.casual_caller_ops}</td>
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

export default CALList;

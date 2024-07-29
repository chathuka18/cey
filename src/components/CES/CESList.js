import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CESList = () => {
    const [ces, setCES] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCES();
  }, []);

  const fetchCES = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/ces');
      setCES(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/ces/${id}`);
      fetchCES();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

    return (
       <div className="company-list">
      <div className="section">
        <h2 className="section-title">CES Data</h2>
        <div className="subsection">
         
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CDL Dry Docking</th>
                        <th>Afloat repair jobs: -No. of Vessels</th>
                        <th>Afloat repair jobs: -No. of Jobs</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ces.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.cdl_dry_docking}</td>
                            <td>{item.no_of_vessels}</td>
                            <td>{item.no_of_jobs}</td>
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

export default CESList;

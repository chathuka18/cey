import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CalifolinkList = () => {

  const [califolink, setCalifolink] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCalifolink();
  }, []);

  const fetchCalifolink= async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/cll');
      setCalifolink(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cll/${id}`);
      fetchCalifolink();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

    return (
        <div className="company-list">
      <div className="section">
        <h2 className="section-title">Califolink Data</h2>
        <div className="subsection">
          
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Container Fleet</th>
                        <th>Container Onhire</th>
                        <th>Utilization Container</th>
                        <th>Machine Fleet</th>
                        <th>Machine Onhire</th>
                        <th>Utilization Machine</th>
                        <th>Transport Jobs</th>
                        <th>No of KM</th>
                        <th>Avg KM</th>
                        <th>TEU</th>
                        <th>Eco</th>
                        <th>Clearing</th>
                        <th>Fabrication</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {califolink.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.container_fleet}</td>
                            <td>{item.container_onhire}</td>
                            <td>{item.untilzation_container}</td>
                            <td>{item.machine_fleet}</td>
                            <td>{item.machine_onhire}</td>
                            <td>{item.untilzation_machine}</td>
                            <td>{item.transport_jobs}</td>
                            <td>{item.no_of_km}</td>
                            <td>{item.avg_km}</td>
                            <td>{item.teu}</td>
                            <td>{item.eco}</td>
                            <td>{item.clearing}</td>
                            <td>{item.fabrication}</td>
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

export default CalifolinkList;

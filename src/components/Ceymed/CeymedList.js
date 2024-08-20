import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CeymedList = () => {

    const [ceymed, setCeymed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCeymed();
    }, []);

    const fetchCeymed = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/ceymed');
      setCeymed(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/ceymed/${id}`);
      fetchCeymed();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete entry. Please try again.');
    }
  };

    return (
        <div className="company-list">
      <div className="section">
        <h2 className="section-title">Ceymed Data</h2>
        <div className="subsection">
          <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>No of Reports</th>
                        <th>No of Chanelling Patients</th>
                        <th>No of Cooperate Staff Medicals</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ceymed.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.no_of_reports}</td>
                            <td>{item.no_of_chanelling_patients}</td>
                            <td>{item.no_of_cooperate_staff_medicals}</td>
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

export default CeymedList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OceaneedsList.css';

const OceaneedsList = () => {
  const [oceaneeds, setOceaneeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchOceaneeds();
  }, []);

  const fetchOceaneeds = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/oceaneeds', { timeout: 10000 });
      setOceaneeds(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        setError(`Failed to fetch data: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('Failed to fetch data: No response received from server');
      } else {
        console.error('Error message:', error.message);
        setError(`Failed to fetch data: ${error.message}`);
      }
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`http://localhost:8080/api/oceaneeds/${id}`);
        fetchOceaneeds();
        alert('Entry deleted successfully');
      } catch (error) {
        console.error('Error deleting data:', error);
        setError('Failed to delete entry. Please try again.');
      }
    }
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortField(field);
    setSortDirection(isAsc ? 'desc' : 'asc');
    const sortedData = [...oceaneeds].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });
    setOceaneeds(sortedData);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="company-list">
      <div className="section">
        <h2 className="section-title">Oceaneeds Data</h2>
        <button onClick={fetchOceaneeds}>Refresh</button>
        <div className="subsection">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>ID {sortField === 'id' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('no_of_operations')}>Operations {sortField === 'no_of_operations' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('no_of_quotations')}>Quotations {sortField === 'no_of_quotations' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('no_of_confirmed_jobs')}>Confirmed Jobs {sortField === 'no_of_confirmed_jobs' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('success_rate')}>Success Rate {sortField === 'success_rate' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('new_principles_tap_added')}>New Principles {sortField === 'new_principles_tap_added' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('date')}>Date {sortField === 'date' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
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
                  <td>{formatDate(item.date)}</td>
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
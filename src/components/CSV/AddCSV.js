import React, { useState } from 'react';
import axios from 'axios';
import './AddCSV.css';

const AddCSV = () => {
    const [csv, setCsv] = useState({
        id: '',
        sea_freight: '',
        air_freight: '',
        logistics_job: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCsv({ ...csv, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/csv`, {
                id: csv.id,
                sea_freight: csv.sea_freight,
                air_freight: csv.air_freight,
                logistics_job: csv.logistics_job,
                date: currentDate
            });
            setSuccess('CSV added successfully!');
            setError(null);
            setCsv({
                id: '',
                sea_freight: '',
                air_freight: '',
                logistics_job: '',
            });
        } catch (error) {
            console.error('There was an error adding the CSV!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the CSV!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="cargo">
        <div className="form-container">
            <h2>Cargo Server</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (CSVyymm) eg(CSV2401):
                    <input type="text" name="id" value={csv.id} onChange={handleChange} required />
                </label>
                <label>
                    Sea Freight TEU's:
                    <input type="number" name="sea_freight" value={csv.sea_freight} onChange={handleChange} required />
                </label>
                <label>
                    Air Frieght KGs:
                    <input type="number" name="air_freight" value={csv.air_freight} onChange={handleChange} required />
                </label>
                <label>
                    Logistics Jobs:
                    <input type="number" name="logistics_job" value={csv.logistics_job} onChange={handleChange} required />
                </label>
                <button type="submit">Add CSV</button>
            </form>
        </div>
        </div>
    );
};

export default AddCSV;

import React, { useState } from 'react';
import axios from 'axios';
import './AddCWS.css';

const AddCWS = () => {
    const [cws, setCWS] = useState({
        id: '',
        wh01_capacity: '',
        wh01_utilization: '',
        wh01_utilization_percentage: '',
        wh02_capacity: '',
        wh02_utilization: '',
        wh02_utilization_percentage: '',
        value_added_services: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCWS({ ...cws, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http://localhost:8080/api/cws', {
                id: cws.id,
                wh01_capacity: cws.wh01_capacity,
                wh01_utilization: cws.wh01_utilization,
                wh01_utilization_percentage: cws.wh01_utilization_percentage,
                wh02_capacity: cws.wh02_capacity,
                wh02_utilization: cws.wh02_utilization,
                wh02_utilization_percentage: cws.wh02_utilization_percentage,
                value_added_services: cws.value_added_services,
                date: currentDate
            });
            setSuccess('Warehouse added successfully!');
            setError(null);
            setCWS({
                id: '',
                wh01_capacity: '',
                wh01_utilization: '',
                wh01_utilization_percentage: '',
                wh02_capacity: '',
                wh02_utilization: '',
                wh02_utilization_percentage: '',
                value_added_services: '' 
            });
        } catch (error) {
            console.error('There was an error adding the cws!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the CWS!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="cws">
        <div className="form-container">
            <h2>Ceyline Warehouse</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (CWSyymm) eg(CWS2401):
                    <input type="text" name="id" value={cws.id} onChange={handleChange} required />
                </label>
                <label>
                    WH 01- Capacity:
                    <input type="number" step="0.01" name="wh01_capacity" value={cws.wh01_capacity} onChange={handleChange} required />
                </label>
                <label>
                    WH 01- Utilization:
                    <input type="number" step="0.01" name="wh01_utilization" value={cws.wh01_utilization} onChange={handleChange} required />
                </label>
                <label>
                    WH 01- Utilization %:
                    <input type="number" step="0.01" name="wh01_utilization_percentage" value={cws.wh01_utilization_percentage} onChange={handleChange} required />
                </label>
                <label>
                    WH 02- Capacity:
                    <input type="number" step="0.01" name="wh02_capacity" value={cws.wh02_capacity} onChange={handleChange} required />
                </label>
                <label>
                    WH 02- Utilization:
                    <input type="number" step="0.01" name="wh02_utilization" value={cws.wh02_utilization} onChange={handleChange} required />
                </label>
                <label>
                    WH 02- Utilization %:
                    <input type="number" step="0.01" name="wh02_utilization_percentage" value={cws.wh02_utilization_percentage} onChange={handleChange} required />
                </label>
                <label>
                    Value Added Services (LKR):
                    <input type="number" step="0.01" name="value_added_services" value={cws.value_added_services} onChange={handleChange} required />
                </label>
                <button type="submit">Add CWS</button>
            </form>
        </div>
        </div>
    );
};

export default AddCWS;

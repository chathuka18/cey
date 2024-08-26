import React, { useState } from 'react';
import axios from 'axios';
import './AddStarlink.css'; 

const AddStarlink = () => {
    const [starlink, setStarlink] = useState({
        id: '',
        full_rigging: '',
        polylining: '',
        fumigation: '',
        container_repairs: '',
        container_spare_sales: '',
        container_washing: '',
        goh_bd: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStarlink({ ...starlink, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/starlink`, {
                id: starlink.id,
                full_rigging: starlink.full_rigging,
                polylining: starlink.polylining,
                fumigation: starlink.fumigation,
                container_repairs: starlink.container_repairs,
                container_spare_sales: starlink.container_spare_sales,
                container_washing: starlink.container_washing,
                goh_bd: starlink.goh_bd,
                date: currentDate
            });
            setSuccess('Starlink added successfully!');
            setError(null);
            setStarlink({
                id: '',
                full_rigging: '',
                polylining: '',
                fumigation: '',
                container_repairs: '',
                container_spare_sales: '',
                container_washing: '',
                goh_bd: ''
            });
        } catch (error) {
            console.error('There was an error adding the starlink!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the starlink!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="star">
        <div className="form-container">
            <h2>Starlink One</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (STLyymm) eg(STL2401):
                    <input type="text" name="id" value={starlink.id} onChange={handleChange} required />
                </label>
                <label>
                    Full Rigging:
                    <input type="number" step="0.01" name="full_rigging" value={starlink.full_rigging} onChange={handleChange} required />
                </label>
                <label>
                    Polylining:
                    <input type="number" step="0.01" name="polylining" value={starlink.polylining} onChange={handleChange} required />
                </label>
                <label>
                    Fumigation:
                    <input type="number" step="0.01" name="fumigation" value={starlink.fumigation} onChange={handleChange} required />
                </label>
                <label>
                    Container Repairs:
                    <input type="number" step="0.01" name="container_repairs" value={starlink.container_repairs} onChange={handleChange} required />
                </label>
                <label>
                    Container Spare Sales:
                    <input type="number" step="0.01" name="container_spare_sales" value={starlink.container_spare_sales} onChange={handleChange} required />
                </label>
                <label>
                    Container Washing:
                    <input type="number" step="0.01" name="container_washing" value={starlink.container_washing} onChange={handleChange} required />
                </label>
                <label>
                    GOH BD:
                    <input type="number" step="0.01" name="goh_bd" value={starlink.goh_bd} onChange={handleChange} required />
                </label>
                <button type="submit">Add Starlink</button>
            </form>
        </div>
        </div>
    );
};

export default AddStarlink;

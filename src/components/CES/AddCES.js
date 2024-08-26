import React, { useState } from 'react';
import axios from 'axios';
import './AddCES.css';

const AddCES = () => {
    const [ces, setCES] = useState({
        id: '',
        cdl_dry_docking: '',
        no_of_vessels: '',
        no_of_jobs: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCES({ ...ces, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ces`, {
                id: ces.id,
                cdl_dry_docking: ces.cdl_dry_docking,
                no_of_vessels: ces.no_of_vessels,
                no_of_jobs: ces.no_of_jobs,
                date: currentDate
            });
            setSuccess('CES added successfully!');
            setError(null);
            setCES({
                id: '',
                cdl_dry_docking: '',
                no_of_vessels: '',
                no_of_jobs: '',
            });
        } catch (error) {
            console.error('There was an error adding the CES!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the CES!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="ces">
        <div className="form-container">
            <h2>Ceyline Engineering Services</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (CESyymm) eg(CES2401):
                    <input type="text" name="id" value={ces.id} onChange={handleChange} required />
                </label>
                <label>
                    CDL Dry Docking:
                    <input type="number" name="cdl_dry_docking" value={ces.cdl_dry_docking} onChange={handleChange} required />
                </label>
                <label>
                    Afloat repair jobs: -No. of Vessels:
                    <input type="number" name="no_of_vessels" value={ces.no_of_vessels} onChange={handleChange} required />
                </label>
                <label>
                    Afloat repair jobs: -No. of Jobs:
                    <input type="number" name="no_of_jobs" value={ces.no_of_jobs} onChange={handleChange} required />
                </label>
                <button type="submit">Add CES</button>
            </form>
        </div>
        </div>
    );
};

export default AddCES;

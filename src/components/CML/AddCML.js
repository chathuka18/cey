import React, { useState } from 'react';
import axios from 'axios';
import './AddCML.css';

const AddCML = () => {
    const [cml, setCml] = useState({
        id: '',
        ship_boat: '',
        flag_state: '',
        endorsement: '',
        oluwil: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCml({ ...cml, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http://localhost:8080/api/cml', {
                ...cml,
                date: currentDate
            });
            setSuccess('CML added successfully!');
            setError(null);
            setCml({
                id: '',
                ship_boat: '',
                flag_state: '',
                endorsement: '',
                oluwil: '',
            });
        } catch (error) {
            console.error('There was an error adding the CML!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the CML!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="cml">
        <div className="form-container">
            <h2>CML Ships</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ID (CMLyymm) eg(CML2401):</label>
                    <input type="text" name="id" value={cml.id} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Ship / Boat Management:</label>
                    <input type="text" name="ship_boat" value={cml.ship_boat} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Flag State Ops:</label>
                    <input type="text" name="flag_state" value={cml.flag_state} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>P&I Endorsements:</label>
                    <input type="text" name="endorsement" value={cml.endorsement} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Oluwil Project Income:</label>
                    <input type="text" name="oluwil" value={cml.oluwil} onChange={handleChange} required />
                </div>
                <button type="submit">Add CML</button>
            </form>
        </div>
        </div>
    );
};

export default AddCML;

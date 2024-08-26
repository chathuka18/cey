import React, { useState } from 'react';
import axios from 'axios';
import './AddCAL.css';

const AddCAL = () => {
    const [cal, setCAL] = useState({
        id: '',
        crew_change: '',
        casual_caller_ops: '',
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCAL({ ...cal, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cal`, {
                id: cal.id,
                crew_change: cal.crew_change,
                casual_caller_ops: cal.casual_caller_ops,
                date: cal.date
            });
            setSuccess('CAL added successfully!');
            setError(null);
            setCAL({
                id: '',
                crew_change: '',
                casual_caller_ops: '',
                date: ''
            });
        } catch (error) {
            console.error('There was an error adding the CAL!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the CAL!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="cal">
        <div className="form-container">
            <h2>CAL Agency</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID(CALyymmww)   eg(CAL240101):
                    <input type="text" name="id" value={cal.id} onChange={handleChange} required />
                </label>
                <label>
                    Crew Change Total:
                    <input type="number" name="crew_change" value={cal.crew_change} onChange={handleChange} required />
                </label>
                <label>
                    Casual Caller Ops:
                    <input type="number" name="casual_caller_ops" value={cal.casual_caller_ops} onChange={handleChange} required />
                </label>
                <label>
                    Date:
                    <input type="date" name="date"  value={cal.date} onChange={handleChange} required />
                </label>
                <button type="submit">Add CAL</button>
            </form>
        </div>
        </div>
    );
};

export default AddCAL;

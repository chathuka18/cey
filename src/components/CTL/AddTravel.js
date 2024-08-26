import React, { useState } from 'react';
import axios from 'axios';
import './AddTravel.css'; // Import the CSS file

const AddTravel = () => {
    const [travel, setTravel] = useState({
        id: '',
        ticketsSeafarer: '',
        ticketsFitCorporate: '',
        outbound: '',
        inbound: '',
        visa: '',
        insurance: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTravel({ ...travel, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/travel`, {
                id: travel.id,
                tickets_Seafarer: travel.ticketsSeafarer,
                tickets_FIT_Corporate: travel.ticketsFitCorporate,
                outbound: travel.outbound,
                inbound: travel.inbound,
                visa: travel.visa,
                insurance: travel.insurance,
                date: currentDate
            });
            setSuccess('Travel added successfully!');
            setError(null);
            setTravel({
                id: '',
                ticketsSeafarer: '',
                ticketsFitCorporate: '',
                outbound: '',
                inbound: '',
                visa: '',
                insurance: '',
            });
        } catch (error) {
            console.error('There was an error adding the travel!', error);
             if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the travel!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="ctl">
        <div className="form-container">
            <h2>Ceyline Travels</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (CTLyymm) eg(CTL2401):
                    <input type="text" name="id" value={travel.id} onChange={handleChange} required />
                </label>
                <label>
                    Seafarer Tickets:
                    <input type="number" name="ticketsSeafarer" value={travel.ticketsSeafarer} onChange={handleChange} required />
                </label>
                <label>
                    Corporate FIT Tickets:
                    <input type="number" name="ticketsFitCorporate" value={travel.ticketsFitCorporate} onChange={handleChange} required />
                </label>
                <label>
                    Outbound:
                    <input type="number" name="outbound" value={travel.outbound} onChange={handleChange} required />
                </label>
                <label>
                    Inbound:
                    <input type="number" name="inbound" value={travel.inbound} onChange={handleChange} required />
                </label>
                <label>
                    Visa:
                    <input type="number" name="visa" value={travel.visa} onChange={handleChange} required />
                </label>
                <label>
                    Insurance:
                    <input type="number" name="insurance" value={travel.insurance} onChange={handleChange} required />
                </label>
                <button type="submit">Add Travel</button>
            </form>
        </div>
        </div>
    );
};

export default AddTravel;

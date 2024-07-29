import React, { useState } from 'react';
import axios from 'axios';
import './AddCMS.css';

const AddCMS = () => {
    const [cms, setCms] = useState({
        id: '',
        foreign_hires: '',
        local: '',
        caller_ops: '',
        agency_network: '',
        new_principles_tap_added: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCms({ ...cms, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http://localhost:8080/api/cms', {
                id: cms.id,
                foreign_hires: cms.foreign_hires,
                local: cms.local,
                caller_ops: cms.caller_ops,
                agency_network: cms.agency_network,
                new_principles_tap_added: cms.new_principles_tap_added,
                date: currentDate
            });
            setSuccess('CMS added successfully!');
            setError(null);
            setCms({
                id: '',
                foreign_hires: '',
                local: '',
                caller_ops: '',
                agency_network: '',
                new_principles_tap_added: '',
            });
        } catch (error) {
            console.error('There was an error adding the CMS!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the CMS!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="cms">
            <div className="form-container">
                <h2>Ceyline Maritime Services</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        ID (CMSyymm) eg(CMS2401):
                        <input type="text" name="id" value={cms.id} onChange={handleChange} required />
                    </label>
                    <label>
                        Launch Hires: From Casual Caller (Foreign):
                        <input type="number" name="foreign_hires" value={cms.foreign_hires} onChange={handleChange} required />
                    </label>
                    <label>
                        Launch Hires: From Agent (Local):
                        <input type="number" name="local" value={cms.local} onChange={handleChange} required />
                    </label>
                    <label>
                        Casual Caller Ops:
                        <input type="number" name="caller_ops" value={cms.caller_ops} onChange={handleChange} required />
                    </label>
                    <label>
                        Agency Network:
                        <input type="number" name="agency_network" value={cms.agency_network} onChange={handleChange} required />
                    </label>
                    <label>
                        New Principles Tap/ Added:
                        <input type="number" name="new_principles_tap_added" value={cms.new_principles_tap_added} onChange={handleChange} required />
                    </label>
                    <button type="submit">Add CMS</button>
                </form>
            </div>
        </div>
    );
};

export default AddCMS;

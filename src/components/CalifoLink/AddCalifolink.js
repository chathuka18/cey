import React, { useState } from 'react';
import axios from 'axios';
import './AddCalifolink.css';

const AddCalifolink = () => {
    const [califolink, setCalifolink] = useState({
        id: '',
        container_fleet: '',
        container_onhire: '',
        untilzation_container: '',
        machine_fleet: '',
        machine_onhire: '',
        untilzation_machine: '',
        transport_jobs: '',
        no_of_km: '',
        avg_km: '',
        teu: '',
        eco: '',
        clearing: '',
        fabrication: '',
        date: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCalifolink({ ...califolink, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http://localhost:8080/api/cll', {
                ...califolink,
                date: currentDate
            });
            setSuccess('Califolink added successfully!');
            setError(null);
            setCalifolink({
                id: '',
                container_fleet: '',
                container_onhire: '',
                untilzation_container: '',
                machine_fleet: '',
                machine_onhire: '',
                untilzation_machine: '',
                transport_jobs: '',
                no_of_km: '',
                avg_km: '',
                teu: '',
                eco: '',
                clearing: '',
                fabrication: '',
                date: ''
            });
        } catch (error) {
            console.error('There was an error adding the Califolink!', error);
           if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the Califolink!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="califo">
        <div className="form-container">
            <h2>Add Califolink</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (CLLyymm) eg(CLL2401):
                    <input type="text" name="id" value={califolink.id} onChange={handleChange} required />
                </label>
                <label>
                    Container Renting: Fleet:
                    <input type="number" name="container_fleet" value={califolink.container_fleet} onChange={handleChange} required />
                </label>
                <label>
                    Container Renting: On Hire:
                    <input type="number" name="container_onhire" value={califolink.container_onhire} onChange={handleChange} required />
                </label>
                <label>
                    Untilzation Container %:
                    <input type="number" name="untilzation_container" value={califolink.untilzation_container} onChange={handleChange} required />
                </label>
                <label>
                    Machine Renting: Fleet:
                    <input type="number" name="machine_fleet" value={califolink.machine_fleet} onChange={handleChange} required />
                </label>
                <label>
                    Machine Renting: On Hire:
                    <input type="number" name="machine_onhire" value={califolink.machine_onhire} onChange={handleChange} required />
                </label>
                <label>
                    Utilization Machines %:
                    <input type="number" name="untilzation_machine" value={califolink.untilzation_machine} onChange={handleChange} required />
                </label>
                <label>
                    Transport Jobs:
                    <input type="number" name="transport_jobs" value={califolink.transport_jobs} onChange={handleChange} required />
                </label>
                <label>
                    Total Number of KMs:
                    <input type="number" name="no_of_km" value={califolink.no_of_km} onChange={handleChange} required />
                </label>
                <label>
                    Average Revenue/ Km:
                    <input type="number" name="avg_km" value={califolink.avg_km} onChange={handleChange} required />
                </label>
                <label>
                    No. of TEU's:
                    <input type="number" name="teu" value={califolink.teu} onChange={handleChange} required />
                </label>
                <label>
                    E/C/O:
                    <input type="number" name="eco" value={califolink.eco} onChange={handleChange} required />
                </label>
                <label>
                    Clearing:
                    <input type="number" name="clearing" value={califolink.clearing} onChange={handleChange} required />
                </label>
                <label>
                    Fabrication:
                    <input type="number" name="fabrication" value={califolink.fabrication} onChange={handleChange} required />
                </label>
                <button type="submit">Add Califolink</button>
            </form>
        </div>
        </div>
    );
};

export default AddCalifolink;

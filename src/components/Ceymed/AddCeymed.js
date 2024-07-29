import React, { useState } from 'react';
import axios from 'axios';
import './AddCeymed.css';

const AddCeymed = () => {
    const [ceymed, setCeymed] = useState({
        id: '',
        no_of_reports: '',
        no_of_chanelling_patients: '',
        no_of_cooperate_staff_medicals: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCeymed({ ...ceymed, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http://localhost:8080/api/ceymed', {
                id: ceymed.id,
                no_of_reports: ceymed.no_of_reports,
                no_of_chanelling_patients: ceymed.no_of_chanelling_patients,
                no_of_cooperate_staff_medicals: ceymed.no_of_cooperate_staff_medicals,
                date: currentDate
            });
            setSuccess('Ceymed added successfully!');
            setError(null);
            setCeymed({
                id: '',
                no_of_reports: '',
                no_of_chanelling_patients: '',
                no_of_cooperate_staff_medicals: '',

            });
        } catch (error) {
            console.error('There was an error adding the Ceymed!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the Ceymed!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="cey">
        <div className="form-container">
            <h2>Ceymed Healthcare Services</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID(CHEyymm) eg(CHE2401):
                    <input type="text" name="id" value={ceymed.id} onChange={handleChange} required />
                </label>
                <label>
                    No of Reports:
                    <input type="number" name="no_of_reports" value={ceymed.no_of_reports} onChange={handleChange} required />
                </label>
                <label>
                    No of Chanelling Patients:
                    <input type="number" name="no_of_chanelling_patients" value={ceymed.no_of_chanelling_patients} onChange={handleChange} required />
                </label>
                <label>
                    No of Cooperate Staff Medicals:
                    <input type="number" name="no_of_cooperate_staff_medicals" value={ceymed.no_of_cooperate_staff_medicals} onChange={handleChange} required />
                </label>
                <button type="submit">Add CAL</button>
            </form>
        </div>
        </div>
    );
};

export default AddCeymed;

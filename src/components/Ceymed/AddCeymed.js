import React, { useState } from 'react';
import axios from 'axios';
import './AddCeymed.css';

const AddCeymed = () => {
    const [formData, setFormData] = useState({
        id: '',
        no_of_reports: '',
        no_of_chanelling_patients: '',
        no_of_consultant_visited: '',
        no_of_cooperate_staff_medicals: '',
        no_of_prescriptions: '',
        no_of_OPD: '',
        no_of_ETU: '',
        no_of_contribution_center: '',
        date: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ceymed`, {
                ...formData,
                currentDate: new Date().toISOString().split('T')[0] 
            });
            setMessage('Ceymed data submitted successfully!');
            setFormData({
                id: '',
                no_of_reports: '',
                no_of_chanelling_patients: '',
                no_of_consultant_visited: '',
                no_of_cooperate_staff_medicals: '',
                no_of_prescriptions: '',
                no_of_OPD: '',
                no_of_ETU: '',
                no_of_contribution_center: '',
                date: ''
            });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setMessage('Error: An entry with this ID already exists.');
            } else {
                setMessage('Error submitting data. Please try again.');
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="ceymed">
            <div className="ceymed-container">
                <h2>Ceymed Healtcare Services</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id">ID (CHEyymm) eg(CHE2401):</label>
                        <input 
                            type="text" 
                            id="id" 
                            name="id" 
                            value={formData.id} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="no_of_reports">Number of Reports:</label>
                        <input 
                            type="number" 
                            id="no_of_reports" 
                            name="no_of_reports" 
                            value={formData.no_of_reports} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="no_of_chanelling_patients">Number of Channelling Patients:</label>
                        <input 
                            type="number" 
                            id="no_of_chanelling_patients" 
                            name="no_of_chanelling_patients" 
                            value={formData.no_of_chanelling_patients} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="no_of_consultant_visited">Number of Consultants Visited:</label>
                        <input 
                            type="number" 
                            id="no_of_consultant_visited" 
                            name="no_of_consultant_visited" 
                            value={formData.no_of_consultant_visited} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="no_of_cooperate_staff_medicals">Number of Cooperate Staff Medicals:</label>
                        <input 
                            type="number" 
                            id="no_of_cooperate_staff_medicals" 
                            name="no_of_cooperate_staff_medicals" 
                            value={formData.no_of_cooperate_staff_medicals} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="no_of_prescriptions">Number of Prescriptions:</label>
                        <input 
                            type="number" 
                            id="no_of_prescriptions" 
                            name="no_of_prescriptions" 
                            value={formData.no_of_prescriptions} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="no_of_OPD">Number of OPD:</label>
                        <input 
                            type="number" 
                            id="no_of_OPD" 
                            name="no_of_OPD" 
                            value={formData.no_of_OPD} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="no_of_ETU">Number of ETU:</label>
                        <input 
                            type="number" 
                            id="no_of_ETU" 
                            name="no_of_ETU" 
                            value={formData.no_of_ETU} 
                            onChange={handleChange} 
                            required 
                        />
                    </div><div className="form-group">
                        <label htmlFor="no_of_contribution_center">Number of Contribution Center:</label>
                        <input 
                            type="number" 
                            id="no_of_contribution_center" 
                            name="no_of_contribution_center" 
                            value={formData.no_of_contribution_center} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default AddCeymed;
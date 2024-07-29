import React, { useState } from 'react';
import axios from 'axios';
import './AddOceaneed.css';

const AddOceaneed = () => {
    const [formData, setFormData] = useState({
        id: '',
        no_of_operations: '',
        no_of_quotations: '',
        no_of_confirmed_jobs: '',
        success_rate: '',
        new_principles_tap_added: '',
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
            const response = await axios.post('http://localhost:8080/api/oceaneeds', {
                ...formData,
                currentDate: new Date().toISOString().split('T')[0] // Set current date automatically
            });
            setMessage('Oceaneeds data submitted successfully!');
            setFormData({
                id: '',
                no_of_operations: '',
                no_of_quotations: '',
                no_of_confirmed_jobs: '',
                success_rate: '',
                new_principles_tap_added: '',
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
        <div className="ocean">
        <div className="oceaneeds-container">
            <h2>Oceaneeds Data Entry</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">ID (ONLyymmww) eg(ONL240101):</label>
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
                    <label htmlFor="no_of_operations">Number of Operations:</label>
                    <input 
                        type="number" 
                        id="no_of_operations" 
                        name="no_of_operations" 
                        value={formData.no_of_operations} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="no_of_quotations">Number of Quotations:</label>
                    <input 
                        type="number" 
                        id="no_of_quotations" 
                        name="no_of_quotations" 
                        value={formData.no_of_quotations} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="no_of_confirmed_jobs">Number of Confirmed Jobs:</label>
                    <input 
                        type="number" 
                        id="no_of_confirmed_jobs" 
                        name="no_of_confirmed_jobs" 
                        value={formData.no_of_confirmed_jobs} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="success_rate">Success Rate:</label>
                    <input 
                        type="number" 
                        id="success_rate" 
                        name="success_rate" 
                        value={formData.success_rate} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="new_principles_tap_added">New Principles Tap Added:</label>
                    <input 
                        type="number" 
                        id="new_principles_tap_added" 
                        name="new_principles_tap_added" 
                        value={formData.new_principles_tap_added} 
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

export default AddOceaneed;
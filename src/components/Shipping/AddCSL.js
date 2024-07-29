import React, { useState } from 'react';
import axios from 'axios';
import './CSL.css';

const AddCSL = () => {
    const [csl, setCsl] = useState({
        id: '',
        crew_on_board: '',
        new_principals: '',
        income: '',
        cost: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCsl({ ...csl, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http://localhost:8080/api/csl', {
                id: csl.id,
                crew_on_board: csl.crew_on_board,
                new_principals: csl.new_principals,
                income: csl.income,
                cost: csl.cost,
                date: currentDate
            });
            setSuccess('CSL added successfully!');
            setError(null);
            setCsl({
                id: '',
                crew_on_board: '',
                new_principals: '',
                income: '',
                cost: '',
            });
        } catch (error) {
            console.error('There was an error adding the CSL!', error);
           if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the CSL!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="csl">
        <div className="form-container">
            <h2>Ceyline Shipping</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (CSLyymm) eg(CSL2401):
                    <input type="text" name="id" value={csl.id} onChange={handleChange} required />
                </label>
                <label>
                    Crew On Board:
                    <input type="number" name="crew_on_board" value={csl.crew_on_board} onChange={handleChange} required />
                </label>
                <label>
                    New Principals:
                    <input type="number" name="new_principals" value={csl.new_principals} onChange={handleChange} required />
                </label>
                <label>
                    Income per COB:
                    <input type="number" name="income" value={csl.income} onChange={handleChange} required />
                </label>
                <label>
                    Cost Per C.O.B:
                    <input type="number" name="cost" value={csl.cost} onChange={handleChange} required />
                </label>
                <button type="submit">Add CSL</button>
            </form>
        </div>
        </div>
    );
};

export default AddCSL;

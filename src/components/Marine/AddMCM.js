import React, { useState } from 'react';
import axios from 'axios';
import './MCM.css';

const AddMCM = () => {
    const [mcm, setMCM] = useState({
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
        setMCM({ ...mcm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http://localhost:8080/api/mcm', {
                id: mcm.id,
                crew_on_board: mcm.crew_on_board,
                new_principals: mcm.new_principals,
                income: mcm.income,
                cost: mcm.cost,
                date: currentDate
            });
            setSuccess('MCM added successfully!');
            setError(null);
            setMCM({
                id: '',
                crew_on_board: '',
                new_principals: '',
                income: '',
                cost: '',
            });
        } catch (error) {
            console.error('There was an error adding the MCM!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the MCM!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="mcm">
        <div className="form-container">
            <h2>Mercantile Marine</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (MCMyymm) eg(MCM2401):
                    <input type="text" name="id" value={mcm.id} onChange={handleChange} required />
                </label>
                <label>
                    Crew On Board:
                    <input type="number" name="crew_on_board" value={mcm.crew_on_board} onChange={handleChange} required />
                </label>
                <label>
                    New Principals:
                    <input type="number" name="new_principals" value={mcm.new_principals} onChange={handleChange} required />
                </label>
                <label>
                    Income per COB:
                    <input type="number" name="income" value={mcm.income} onChange={handleChange} required />
                </label>
                <label>
                    Cost Per C.O.B:
                    <input type="number" name="cost" value={mcm.cost} onChange={handleChange} required />
                </label>
                <button type="submit">Add MCM</button>
            </form>
        </div>
        </div>
    );
};

export default AddMCM;

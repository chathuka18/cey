import React, { useState } from 'react';
import axios from 'axios';
import './CMA.css';

const AddCMA = () => {
    const [cma, setCMA] = useState({
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
        setCMA({ ...cma, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http:localhost:8080/api/cma', {
                id: cma.id,
                crew_on_board: cma.crew_on_board,
                new_principals: cma.new_principals,
                income: cma.income,
                cost: cma.cost,
                date: currentDate
            });
            setSuccess('CMA added successfully!');
            setError(null);
            setCMA({
                id: '',
                crew_on_board: '',
                new_principals: '',
                income: '',
                cost: '',
            });
        } catch (error) {
            console.error('There was an error adding the CMA!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the CMA!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="cma">
        <div className="form-container">
            <h2>CMA Ships</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (CMAyymm) eg(CMA2401):
                    <input type="text" name="id" value={cma.id} onChange={handleChange} required />
                </label>
                <label>
                    Crew On Board:
                    <input type="number" name="crew_on_board" value={cma.crew_on_board} onChange={handleChange} required />
                </label>
                <label>
                    New Principals:
                    <input type="number" name="new_principals" value={cma.new_principals} onChange={handleChange} required />
                </label>
                <label>
                    Income per COB:
                    <input type="number" name="income" value={cma.income} onChange={handleChange} required />
                </label>
                <label>
                    Cost Per C.O.B:
                    <input type="number" name="cost" value={cma.cost} onChange={handleChange} required />
                </label>
                <button type="submit">Add CMA</button>
            </form>
        </div>
        </div>
    );
};

export default AddCMA;

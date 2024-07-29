import React, { useState } from 'react';
import axios from 'axios';
import './AddCCS.css'; 

const AddCCS = () => {
    const [ccs, setCcs] = useState({
        id: '',
        gate_movement: '',
        storage_laden: '',
        storage_empty: '',
        refer_container: '',
        repairs_usd: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCcs({ ...ccs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http://localhost:8080/api/ccs', {
                id: ccs.id,
                gate_movement: ccs.gate_movement,
                storage_laden: ccs.storage_laden,
                storage_empty: ccs.storage_empty,
                refer_container: ccs.refer_container,
                repairs_usd: ccs.repairs_usd,
                date: currentDate
            });
            setSuccess('CCS added successfully!');
            setError(null);
            setCcs({
                id: '',
                gate_movement: '',
                storage_laden: '',
                storage_empty: '',
                refer_container: '',
                repairs_usd: '',
            });
        } catch (error) {
            console.error('There was an error adding the CCS!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the CCS!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="ccs">
        <div className="form-container">
            <h2>Cey Container Services</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (CCSyymm) eg(CCS2401):
                    <input type="text" name="id" value={ccs.id} onChange={handleChange} required />
                </label>
                <label>
                    Average Gate Movement (Per Day):
                    <input type="number" name="gate_movement" value={ccs.gate_movement} onChange={handleChange} required />
                </label>
                <label>
                    Average Storage -Laden (Per Day):
                    <input type="number" name="storage_laden" value={ccs.storage_laden} onChange={handleChange} required />
                </label>
                <label>
                    Average Storage -Empty (Per Day):
                    <input type="number" name="storage_empty" value={ccs.storage_empty} onChange={handleChange} required />
                </label>
                <label>
                    Average Refer Containers (Per Day):
                    <input type="number" name="refer_container" value={ccs.refer_container} onChange={handleChange} required />
                </label>
                <label>
                    Repairs (USD):
                    <input type="number" name="repairs_usd" value={ccs.repairs_usd} onChange={handleChange} required />
                </label>
                <button type="submit">Add CCS</button>
            </form>
        </div>
        </div>
    );
};

export default AddCCS;

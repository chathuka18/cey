import React, { useState } from 'react';
import axios from 'axios'; 
import './AddNVOCC.css';

const AddNVOCC = () => {
    const [nvocc, setNVOCC] = useState({
        id: '',
        loading: '',
        discharging: '',
        transhipment: '',
        liner: '',
        export: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNVOCC({ ...nvocc, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http://localhost:8080/api/nvocc', {
                id: nvocc.id,
                loading: nvocc.loading,
                discharging: nvocc.discharging,
                transhipment: nvocc.transhipment,
                liner: nvocc.liner,
                export: nvocc.export,
                date: currentDate
            });
            setSuccess('NVOCC added successfully!');
            setError(null);
            setNVOCC({
                id: '',
                loading: '',
                discharging: '',
                transhipment: '',
                liner: '',
                export: '',
            });
        } catch (error) {
            console.error('There was an error adding the NVOCC!', error);
           if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the NVOCC!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="calnvocc">
        <div className="form-container">
            <h2>CAL NVOCC</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID(NVOCCyymm) eg(NVOCC2401):
                    <input type="text" name="id" value={nvocc.id} onChange={handleChange} required />
                </label>
                <label>
                    Loading TEU's:
                    <input type="number" name="loading" value={nvocc.loading} onChange={handleChange} required />
                </label>
                <label>
                    Discharging TEU's:
                    <input type="number" name="discharging" value={nvocc.discharging} onChange={handleChange} required />
                </label>
                <label>
                    Transhipment Handling TEU's:
                    <input type="number" name="transhipment" value={nvocc.transhipment} onChange={handleChange} required />
                </label>
                <label>
                    Liner DO TEU's:
                    <input type="number" name="liner" value={nvocc.liner} onChange={handleChange} required />
                </label>
                <label>
                    Export BL TEU's:
                    <input type="number" name="export" value={nvocc.export} onChange={handleChange} required />
                </label>
                <button type="submit">Add NVOCC</button>
            </form>
        </div>
        </div>
    );
};

export default AddNVOCC;

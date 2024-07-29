import React, { useState } from 'react';
import axios from 'axios';
import './AddMSTS.css';

const AddMSTS = () => {
    const [msts, setMSTS] = useState({
        id: '',
        pti: '',
        monitoring_days: '',
        fleet: '',
        owned_rent: '',
        on_hire: '',
        re_work: '',
        survey: '',
        reefer_spare: '',
        vessel_spare: '',
        reefer_repairs: '',
        exports: '',
        maldives: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMSTS({ ...msts, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('http://localhost:8080/api/msts', {
                ...msts,
                date: currentDate
            });
            setSuccess('MSTS added successfully!');
            setError(null);
            setMSTS({
                id: '',
                pti: '',
                monitoring_days: '',
                fleet: '',
                owned_rent: '',
                on_hire: '',
                re_work: '',
                survey: '',
                reefer_spare: '',
                vessel_spare: '',
                reefer_repairs: '',
                exports: '',
                maldives: '',
            });
        } catch (error) {
            console.error('There was an error adding the MSTS!', error);
            if (error.response && error.response.status === 409) {
            setError('A record with this ID already exists. Please use a different ID.');
        } else {
            setError('There was an error adding the MSTS!');
        }
        setSuccess(null);
    }
    };

    return (
        <div className="msts">
        <div className="form-container">
            <h2>Marine Survey & Technology Services</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID (MSTSyymm) eg(MSTS2401):
                    <input type="text" name="id" value={msts.id} onChange={handleChange} required />
                </label>
                <label>
                    PTI:
                    <input type="number" name="pti" value={msts.pti} onChange={handleChange} required />
                </label>
                <label>
                    Monitoring Days:
                    <input type="number" name="monitoring_days" value={msts.monitoring_days} onChange={handleChange} required />
                </label>
                <label>
                    Fleet:
                    <input type="number" name="fleet" value={msts.fleet} onChange={handleChange} required />
                </label>
                <label>
                    Owned/Rent:
                    <input type="number" name="owned_rent" value={msts.owned_rent} onChange={handleChange} required />
                </label>
                <label>
                    On Hire:
                    <input type="number" name="on_hire" value={msts.on_hire} onChange={handleChange} required />
                </label>
                <label>
                    Re-work:
                    <input type="number" name="re_work" value={msts.re_work} onChange={handleChange} required />
                </label>
                <label>
                    Survey:
                    <input type="number" name="survey" value={msts.survey} onChange={handleChange} required />
                </label>
                <label>
                    Reefer Spare:
                    <input type="number" name="reefer_spare" value={msts.reefer_spare} onChange={handleChange} required />
                </label>
                <label>
                    Vessel Spare:
                    <input type="number" name="vessel_spare" value={msts.vessel_spare} onChange={handleChange} required />
                </label>
                <label>
                    Reefer Repairs:
                    <input type="number" name="reefer_repairs" value={msts.reefer_repairs} onChange={handleChange} required />
                </label>
                <label>
                    Exports:
                    <input type="number" name="exports" value={msts.exports} onChange={handleChange} required />
                </label>
                <label>
                    Maldives:
                    <input type="number" name="maldives" value={msts.maldives} onChange={handleChange} required />
                </label>
                <button type="submit">Add MSTS</button>
            </form>
        </div>
        </div>
    );
};

export default AddMSTS;

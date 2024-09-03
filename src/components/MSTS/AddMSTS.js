import React, { useState } from 'react';
import axios from 'axios';

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
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMSTS({ ...msts, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/msts`, {
                ...msts,
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
                date: '',
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Marine Survey & Technology Services</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.entries(msts).map(([key, value]) => (
                        key !== 'date' && (
                            <div key={key} className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1 capitalize">
                                    {key.replace(/_/g, ' ')}:
                                </label>
                                <input
                                    type={key === 'id' ? 'text' : 'number'}
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    required
                                    className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        )
                    ))}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={msts.date}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add MSTS
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMSTS;

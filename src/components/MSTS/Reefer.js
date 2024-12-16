import React, { useState } from 'react';
import axios from 'axios';

const AddMSTS = () => {
    const [msts, setMSTS] = useState({
        reefer_renting_fleet: '',
        onHire_MSTS: '',
        outSource_reefers_onHire: '',
        onHire_maldives: '',
        no_of_reefer_repairs_renting: '',
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
            await axios.post(`${process.env.REACT_APP_API_URL}/api/msts-reefer`, msts);
            setSuccess('MSTS added successfully!');
            setError(null);
            setMSTS({
                
                reefer_renting_fleet: '',
                onHire_MSTS: '',
                outSource_reefers_onHire: '',
                onHire_maldives: '',
                no_of_reefer_repairs_renting: '',
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Marine Survey & Technology Services</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
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
                    </div>
                    
                    {/* Reefer Renting Section */}
                    <div className='border-2 border-blue-500 rounded-lg p-4'>
                        <h3 className="text-xl font-semibold mb-4 text-blue-500">Reefer Renting Department</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Reefer Renting Fleet:</label>
                                <input
                                    type="number"
                                    name="reefer_renting_fleet"
                                    value={msts.reefer_renting_fleet}
                                    onChange={handleChange}
                                    required
                                    className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">On Hire MSTS:</label>
                                <input
                                    type="number"
                                    name="onHire_MSTS"
                                    value={msts.onHire_MSTS}
                                    onChange={handleChange}
                                    required
                                    className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Outsource Reefer (On Hire):</label>
                            <input
                                type="number"
                                name="outSource_reefers_onHire"
                                value={msts.outSource_reefers_onHire}
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">On Hire Reefer (Maldives):</label>
                            <input
                                type="number"
                                name="onHire_maldives"
                                value={msts.onHire_maldives}
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">No. of Reefer Repairs/Supply:</label>
                            <input
                                type="number"
                                name="no_of_reefer_repairs_renting"
                                value={msts.no_of_reefer_repairs_renting}
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        </div>
                    </div>

                    

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gradient-to-l transform hover:scale-105 transition-transform duration-300"
                    >
                        Add Data
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMSTS;

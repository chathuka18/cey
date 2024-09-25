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
            await axios.post(`${process.env.REACT_APP_API_URL}/api/msts`, msts);
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
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">ID:()</label>
                        <input
                            type="text"
                            name="id"
                            value={msts.id}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">No. of PTI:</label>
                        <input
                            type="number"
                            name="pti"
                            value={msts.pti}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">No. of Monitoring Days:</label>
                        <input
                            type="number"
                            name="monitoring_days"
                            value={msts.monitoring_days}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Reefer Renting Fleet:</label>
                        <input
                            type="number"
                            name="fleet"
                            value={msts.fleet}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">On Hire Reefer (MSTS Owned):</label>
                        <input
                            type="number"
                            name="owned_rent"
                            value={msts.owned_rent}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Outsource Reefer (On Hire):</label>
                        <input
                            type="number"
                            name="on_hire"
                            value={msts.on_hire}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Re-work Operations (No. of Jobs):</label>
                        <input
                            type="number"
                            name="re_work"
                            value={msts.re_work}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Survey (No. of Jobs):</label>
                        <input
                            type="number"
                            name="survey"
                            value={msts.survey}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">No. of Reefer Spare Part Supplies:</label>
                        <input
                            type="number"
                            name="reefer_spare"
                            value={msts.reefer_spare}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">No. of Vessel Spare Part Supplies:</label>
                        <input
                            type="number"
                            name="vessel_spare"
                            value={msts.vessel_spare}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">No. of Reefer Repairs:</label>
                        <input
                            type="number"
                            name="reefer_repairs"
                            value={msts.reefer_repairs}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">No. of Perishable Exports:</label>
                        <input
                            type="number"
                            name="exports"
                            value={msts.exports}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Maldives:</label>
                        <input
                            type="number"
                            name="maldives"
                            value={msts.maldives}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
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

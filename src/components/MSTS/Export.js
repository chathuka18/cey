import React, { useState } from 'react';
import axios from 'axios';

const Export = () => {
    const [travel, setTravel] = useState({
        ticketsSeafarer: '',
        ticketsFitCorporate: '',
        outbound: '',
        inbound: '',
        visa: '',
        insurance: '',
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTravel({ ...travel, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/travel`, {
                tickets_Seafarer: travel.ticketsSeafarer,
                tickets_FIT_Corporate: travel.ticketsFitCorporate,
                outbound: travel.outbound,
                inbound: travel.inbound,
                visa: travel.visa,
                insurance: travel.insurance,
                date: travel.date,
            });
            setSuccess('Maldives data added successfully!');
            setError(null);
            setTravel({
                ticketsSeafarer: '',
                ticketsFitCorporate: '',
                outbound: '',
                inbound: '',
                visa: '',
                insurance: '',
                date: '',
            });
        } catch (error) {
            console.error('There was an error adding the data!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the data!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-10 border border-blue-100">
                <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-600 tracking-wide">
                    MSTS - Maldives
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-lg text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded-lg text-center">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={travel.date}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                        />
                    </div>

                    {/* Two-column grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                No. of Monthly Service
                            </label>
                            <input
                                type="number"
                                name="ticketsSeafarer"
                                value={travel.ticketsSeafarer}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            No. of PTI
                            </label>
                            <input
                                type="number"
                                name="ticketsFitCorporate"
                                value={travel.ticketsFitCorporate}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            No. of Spare Parts Supply

                            </label>
                            <input
                                type="number"
                                name="outbound"
                                value={travel.outbound}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            No. of Repairs
                            </label>
                            <input
                                type="number"
                                name="inbound"
                                value={travel.inbound}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            No. of Renting
                            </label>
                            <input
                                type="number"
                                name="visa"
                                value={travel.visa}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            No. of Inspection
                            </label>
                            <input
                                type="number"
                                name="insurance"
                                value={travel.insurance}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                         Add Maldives Data
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Export;

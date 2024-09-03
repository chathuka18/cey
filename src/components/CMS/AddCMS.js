import React, { useState } from 'react';
import axios from 'axios';

const AddCMS = () => {
    const [cms, setCms] = useState({
        id: '',
        foreign_hires: '',
        local: '',
        caller_ops: '',
        agency_network: '',
        new_principles_tap_added: '',
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCms({ ...cms, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/cms`, cms);
            setSuccess('CMS added successfully!');
            setError(null);
            setCms({
                id: '',
                foreign_hires: '',
                local: '',
                caller_ops: '',
                agency_network: '',
                new_principles_tap_added: '',
                date: '',
            });
        } catch (error) {
            console.error('There was an error adding the CMS!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the CMS!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ceyline Maritime Services</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">ID (CMSyymmww) eg(CMS240101):</label>
                        <input
                            type="text"
                            name="id"
                            value={cms.id}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Launch Hires: From Casual Caller (Foreign):</label>
                        <input
                            type="number"
                            name="foreign_hires"
                            value={cms.foreign_hires}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Launch Hires: From Agent (Local):</label>
                        <input
                            type="number"
                            name="local"
                            value={cms.local}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Casual Caller Ops:</label>
                        <input
                            type="number"
                            name="caller_ops"
                            value={cms.caller_ops}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Agency Network:</label>
                        <input
                            type="number"
                            name="agency_network"
                            value={cms.agency_network}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">New Principles Tap/ Added:</label>
                        <input
                            type="number"
                            name="new_principles_tap_added"
                            value={cms.new_principles_tap_added}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={cms.date}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Add CMS
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCMS;

import React, { useState } from 'react';
import axios from 'axios';
import cesImg from '../../img/ces.jpeg';

const AddCES = () => {
    const [ces, setCES] = useState({
        cdl_dry_docking: '',
        no_of_vessels: '',
        no_of_jobs: '',
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCES({ ...ces, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ces`, {
                cdl_dry_docking: ces.cdl_dry_docking,
                no_of_vessels: ces.no_of_vessels,
                no_of_jobs: ces.no_of_jobs,
                date: ces.date
            });
            setSuccess('CES added successfully!');
            setError(null);
            setCES({
                cdl_dry_docking: '',
                no_of_vessels: '',
                no_of_jobs: '',
                date: ''
            });
        } catch (error) {
            console.error('There was an error adding the CES!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the CES!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${cesImg})` }}>
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ceyline Engineering Services</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input type="date" name="date" value={ces.date} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <label className="block">
                        <span className="text-gray-700">CDL Dry Docking:</span>
                        <input 
                            type="number" 
                            name="cdl_dry_docking" 
                            value={ces.cdl_dry_docking} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Afloat Repair Jobs: No. of Vessels:</span>
                        <input 
                            type="number" 
                            name="no_of_vessels" 
                            value={ces.no_of_vessels} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Afloat Repair Jobs: No. of Jobs:</span>
                        <input 
                            type="number" 
                            name="no_of_jobs" 
                            value={ces.no_of_jobs} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add CES
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCES;

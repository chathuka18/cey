import React, { useState } from 'react';
import axios from 'axios';

const AddCWS = () => {
    const [cws, setCWS] = useState({
        wh01_capacity: '',
        wh01_utilization: '',
        wh01_utilization_percentage: '',
        wh02_capacity: '',
        wh02_utilization: '',
        wh02_utilization_percentage: '',
        value_added_services: '',
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCWS({ ...cws, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cws`, cws);
            setSuccess('Warehouse added successfully!');
            setError(null);
            setCWS({
                wh01_capacity: '',
                wh01_utilization: '',
                wh01_utilization_percentage: '',
                wh02_capacity: '',
                wh02_utilization: '',
                wh02_utilization_percentage: '',
                value_added_services: '',
                date: '',
            });
        } catch (error) {
            console.error('There was an error adding the CWS!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the CWS!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="cws min-h-screen flex items-center justify-center p-6 bg-gray-100">
            <div className="form-container max-w-md w-full bg-white p-8 shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center mb-6">Ceyline Warehouse</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date:</label>
                        <input 
                            type="date" 
                            name="date" 
                            value={cws.date} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">WH 01- Capacity:</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            name="wh01_capacity" 
                            value={cws.wh01_capacity} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">WH 01- Utilization:</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            name="wh01_utilization" 
                            value={cws.wh01_utilization} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">WH 01- Utilization %:</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            name="wh01_utilization_percentage" 
                            value={cws.wh01_utilization_percentage} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">WH 02- Capacity:</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            name="wh02_capacity" 
                            value={cws.wh02_capacity} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">WH 02- Utilization:</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            name="wh02_utilization" 
                            value={cws.wh02_utilization} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">WH 02- Utilization %:</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            name="wh02_utilization_percentage" 
                            value={cws.wh02_utilization_percentage} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Value Added Services (LKR):</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            name="value_added_services" 
                            value={cws.value_added_services} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Add CWS
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCWS;

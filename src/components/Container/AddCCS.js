import React, { useState } from 'react';
import axios from 'axios';

const AddCCS = () => {
    const [ccs, setCcs] = useState({
        id: '',
        gate_movement: '',
        storage_laden: '',
        storage_empty: '',
        refer_container: '',
        repairs_usd: '',
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCcs({ ...ccs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/ccs`, ccs);
            setSuccess('CCS added successfully!');
            setError(null);
            setCcs({
                id: '',
                gate_movement: '',
                storage_laden: '',
                storage_empty: '',
                refer_container: '',
                repairs_usd: '',
                date: '',
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
        <div className="ccs p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="form-container max-w-xl w-full bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Cey Container Services</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID (CCSyymmww) e.g., (CCS240101):</label>
                        <input type="text" name="id" value={ccs.id} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Average Gate Movement (Per Day):</label>
                        <input type="number" name="gate_movement" value={ccs.gate_movement} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Average Storage - Laden (Per Day):</label>
                        <input type="number" name="storage_laden" value={ccs.storage_laden} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Average Storage - Empty (Per Day):</label>
                        <input type="number" name="storage_empty" value={ccs.storage_empty} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Average Refer Containers (Per Day):</label>
                        <input type="number" name="refer_container" value={ccs.refer_container} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Repairs (USD):</label>
                        <input type="number" name="repairs_usd" value={ccs.repairs_usd} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input type="date" name="date" value={ccs.date} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Add CCS
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCCS;

import React, { useState } from 'react';
import axios from 'axios';
import calImg from '../../img/nvocc.jpg';

const AddNVOCC = () => {
    const [nvocc, setNVOCC] = useState({
        id: '',
        loading: '',
        discharging: '',
        transhipment: '',
        liner: '',
        export: '',
        date: '',
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/nvocc`, {
                id: nvocc.id,
                loading: nvocc.loading,
                discharging: nvocc.discharging,
                transhipment: nvocc.transhipment,
                liner: nvocc.liner,
                export: nvocc.export,
                date: nvocc.date
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
                date: ''
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
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${calImg})` }}>
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">CAL NVOCC</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">ID (NVOCCyymmww) eg (NVOCC240101):</label>
                        <input
                            type="text"
                            name="id"
                            value={nvocc.id}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Loading TEU's:</label>
                        <input
                            type="number"
                            name="loading"
                            value={nvocc.loading}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Discharging TEU's:</label>
                        <input
                            type="number"
                            name="discharging"
                            value={nvocc.discharging}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Transhipment Handling TEU's:</label>
                        <input
                            type="number"
                            name="transhipment"
                            value={nvocc.transhipment}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Liner DO TEU's:</label>
                        <input
                            type="number"
                            name="liner"
                            value={nvocc.liner}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Export BL TEU's:</label>
                        <input
                            type="number"
                            name="export"
                            value={nvocc.export}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input type="date" name="date" value={nvocc.date} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add NVOCC
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNVOCC;

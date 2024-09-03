import React, { useState } from 'react';
import axios from 'axios';
import cmlImg from '../../img/cmlships.jpg';

const AddCML = () => {
    const [cml, setCml] = useState({
        id: '',
        ship_boat: '',
        flag_state: '',
        endorsement: '',
        oluwil: '',
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCml({ ...cml, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/cml`, cml);
            setSuccess('CML added successfully!');
            setError(null);
            setCml({
                id: '',
                ship_boat: '',
                flag_state: '',
                endorsement: '',
                oluwil: '',
                date: '',
            });
        } catch (error) {
            console.error('There was an error adding the CML!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the CML!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${cmlImg})` }}>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add CML</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">ID (CMLyymmww) eg(CML240101):</label>
                        <input
                            type="text"
                            name="id"
                            value={cml.id}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Ship / Boat Management:</label>
                        <input
                            type="text"
                            name="ship_boat"
                            value={cml.ship_boat}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Flag State Ops:</label>
                        <input
                            type="text"
                            name="flag_state"
                            value={cml.flag_state}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">P&I Endorsements:</label>
                        <input
                            type="text"
                            name="endorsement"
                            value={cml.endorsement}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Oluwil Project Income:</label>
                        <input
                            type="text"
                            name="oluwil"
                            value={cml.oluwil}
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
                            value={cml.date}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Add CML
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCML;

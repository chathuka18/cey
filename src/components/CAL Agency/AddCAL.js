import React, { useState } from 'react';
import axios from 'axios';
import calImg from '../../img/cal.webp';

const AddCAL = () => {
    const [cal, setCAL] = useState({
        crew_change: '',
        casual_caller_ops: '',
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCAL({ ...cal, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cal`, {
                crew_change: cal.crew_change,
                casual_caller_ops: cal.casual_caller_ops,
                date: cal.date
            });
            setSuccess('CAL added successfully!');
            setError(null);
            setCAL({
                crew_change: '',
                casual_caller_ops: '',
                date: ''
            });
        } catch (error) {
            console.error('There was an error adding the CAL!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the CAL!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${calImg})` }}>
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">CAL Agency</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input type="date" name="date" value={cal.date} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Crew Change Total:</label>
                        <input type="number" name="crew_change" value={cal.crew_change} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Casual Caller Ops:</label>
                        <input type="number" name="casual_caller_ops" value={cal.casual_caller_ops} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Add CAL</button>
                </form>
            </div>
        </div>
    );
};

export default AddCAL;

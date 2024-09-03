import React, { useState } from 'react';
import axios from 'axios';

const AddTravel = () => {
    const [travel, setTravel] = useState({
        id: '',
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
                id: travel.id,
                tickets_Seafarer: travel.ticketsSeafarer,
                tickets_FIT_Corporate: travel.ticketsFitCorporate,
                outbound: travel.outbound,
                inbound: travel.inbound,
                visa: travel.visa,
                insurance: travel.insurance,
                date: travel.date,
            });
            setSuccess('Travel added successfully!');
            setError(null);
            setTravel({
                id: '',
                ticketsSeafarer: '',
                ticketsFitCorporate: '',
                outbound: '',
                inbound: '',
                visa: '',
                insurance: '',
                date: '',
            });
        } catch (error) {
            console.error('There was an error adding the travel!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the travel!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Ceyline Travels</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID (CTLyymm) eg(CTL2401):</label>
                        <input 
                            type="text" 
                            name="id" 
                            value={travel.id} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Seafarer Tickets:</label>
                        <input 
                            type="number" 
                            name="ticketsSeafarer" 
                            value={travel.ticketsSeafarer} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Corporate FIT Tickets:</label>
                        <input 
                            type="number" 
                            name="ticketsFitCorporate" 
                            value={travel.ticketsFitCorporate} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Outbound:</label>
                        <input 
                            type="number" 
                            name="outbound" 
                            value={travel.outbound} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Inbound:</label>
                        <input 
                            type="number" 
                            name="inbound" 
                            value={travel.inbound} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Visa:</label>
                        <input 
                            type="number" 
                            name="visa" 
                            value={travel.visa} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Insurance:</label>
                        <input 
                            type="number" 
                            name="insurance" 
                            value={travel.insurance} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input 
                            type="date" 
                            name="date" 
                            value={travel.date} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Add Travel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTravel;

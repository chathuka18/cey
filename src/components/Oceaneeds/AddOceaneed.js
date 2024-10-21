import React, { useState } from 'react';
import axios from 'axios';

const AddOceaneed = () => {
    const [formData, setFormData] = useState({
        no_of_operations: '',
        no_of_quotations: '',
        no_of_confirmed_jobs: '',
        success_rate: '',
        new_principles_tap_added: '',
        date: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/oceaneeds`, {
                ...formData,
            });
            setMessage('Oceaneeds data submitted successfully!');
            setFormData({
                no_of_operations: '',
                no_of_quotations: '',
                no_of_confirmed_jobs: '',
                success_rate: '',
                new_principles_tap_added: '',
                date: ''
            });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setMessage('Error: An entry with this ID already exists.');
            } else {
                setMessage('Error submitting data. Please try again.');
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Oceaneeds Data Entry</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                            Date:
                        </label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="no_of_operations" className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Operations:
                        </label>
                        <input 
                            type="number" 
                            id="no_of_operations" 
                            name="no_of_operations" 
                            value={formData.no_of_operations} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="no_of_quotations" className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Quotations:
                        </label>
                        <input 
                            type="number" 
                            id="no_of_quotations" 
                            name="no_of_quotations" 
                            value={formData.no_of_quotations} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="no_of_confirmed_jobs" className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Confirmed Jobs:
                        </label>
                        <input 
                            type="number" 
                            id="no_of_confirmed_jobs" 
                            name="no_of_confirmed_jobs" 
                            value={formData.no_of_confirmed_jobs} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="success_rate" className="block text-sm font-medium text-gray-700 mb-1">
                            Success Rate:
                        </label>
                        <input 
                            type="number" 
                            id="success_rate" 
                            name="success_rate" 
                            value={formData.success_rate} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="new_principles_tap_added" className="block text-sm font-medium text-gray-700 mb-1">
                            New Principles Tap Added:
                        </label>
                        <input 
                            type="number" 
                            id="new_principles_tap_added" 
                            name="new_principles_tap_added" 
                            value={formData.new_principles_tap_added} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
                {message && <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default AddOceaneed;

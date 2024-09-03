import React, { useState } from 'react';
import axios from 'axios';
import cmaImg from '../../img/cmaships.jpg';

const AddCMA = () => {
    const [cma, setCMA] = useState({
        id: '',
        crew_on_board: '',
        new_principals: '',
        income: '',
        cost: '',
        date: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCMA({ ...cma, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/cma`, cma);
            setSuccess('CMA added successfully!');
            setError(null);
            setCMA({
                id: '',
                crew_on_board: '',
                new_principals: '',
                income: '',
                cost: '',
                date: ''
            });
        } catch (error) {
            console.error('There was an error adding the CMA!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the CMA!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${cmaImg})` }}>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add CMA Ship Data</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="id" className="text-sm font-medium text-gray-700 mb-1">ID (CMAyymmww) eg(CMA240101):</label>
                        <input 
                            type="text" 
                            name="id" 
                            id="id" 
                            value={cma.id} 
                            onChange={handleChange} 
                            required 
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="crew_on_board" className="text-sm font-medium text-gray-700 mb-1">Crew On Board:</label>
                        <input 
                            type="number" 
                            name="crew_on_board" 
                            id="crew_on_board" 
                            value={cma.crew_on_board} 
                            onChange={handleChange} 
                            required 
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="new_principals" className="text-sm font-medium text-gray-700 mb-1">New Principals:</label>
                        <input 
                            type="number" 
                            name="new_principals" 
                            id="new_principals" 
                            value={cma.new_principals} 
                            onChange={handleChange} 
                            required 
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="income" className="text-sm font-medium text-gray-700 mb-1">Income per COB:</label>
                        <input 
                            type="number" 
                            name="income" 
                            id="income" 
                            value={cma.income} 
                            onChange={handleChange} 
                            required 
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="cost" className="text-sm font-medium text-gray-700 mb-1">Cost Per C.O.B:</label>
                        <input 
                            type="number" 
                            name="cost" 
                            id="cost" 
                            value={cma.cost} 
                            onChange={handleChange} 
                            required 
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input 
                            type="date" 
                            name="date" 
                            id="date" 
                            value={cma.date} 
                            onChange={handleChange} 
                            required 
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Add CMA
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCMA;

import React, { useState } from 'react';
import axios from 'axios';

const AddCSL = () => {
    const [csl, setCsl] = useState({
        id: '',
        crew_on_board: '',
        new_principals: '',
        income: '',
        cost: '',
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCsl({ ...csl, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/csl`, {
                id: csl.id,
                crew_on_board: csl.crew_on_board,
                new_principals: csl.new_principals,
                income: csl.income,
                cost: csl.cost,
                date: csl.date,
            });
            setSuccess('CSL added successfully!');
            setError(null);
            setCsl({
                id: '',
                crew_on_board: '',
                new_principals: '',
                income: '',
                cost: '',
                date: '',
            });
        } catch (error) {
            console.error('There was an error adding the CSL!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the CSL!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-md rounded-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Add CSL Record</h2>
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                {success && <p className="text-center text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">ID (CSLyymm) e.g., CSL2401:</span>
                        <input
                            type="text"
                            name="id"
                            value={csl.id}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Crew On Board:</span>
                        <input
                            type="number"
                            name="crew_on_board"
                            value={csl.crew_on_board}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">New Principals:</span>
                        <input
                            type="number"
                            name="new_principals"
                            value={csl.new_principals}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Income per COB:</span>
                        <input
                            type="number"
                            name="income"
                            value={csl.income}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Cost Per C.O.B:</span>
                        <input
                            type="number"
                            name="cost"
                            value={csl.cost}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <div className="block">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={csl.date}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Add CSL
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCSL;

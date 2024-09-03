import React, { useState } from 'react';
import axios from 'axios';

const AddStarlink = () => {
    const [starlink, setStarlink] = useState({
        id: '',
        full_rigging: '',
        polylining: '',
        fumigation: '',
        container_repairs: '',
        container_spare_sales: '',
        container_washing: '',
        goh_bd: '',
        date: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStarlink({ ...starlink, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/starlink`, {
                id: starlink.id,
                full_rigging: starlink.full_rigging,
                polylining: starlink.polylining,
                fumigation: starlink.fumigation,
                container_repairs: starlink.container_repairs,
                container_spare_sales: starlink.container_spare_sales,
                container_washing: starlink.container_washing,
                goh_bd: starlink.goh_bd,
                date: starlink.date
            });
            setSuccess('Starlink added successfully!');
            setError(null);
            setStarlink({
                id: '',
                full_rigging: '',
                polylining: '',
                fumigation: '',
                container_repairs: '',
                container_spare_sales: '',
                container_washing: '',
                goh_bd: '',
                date: ''
            });
        } catch (error) {
            console.error('There was an error adding the starlink!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the starlink!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="star min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            <div className="form-container w-full max-w-lg bg-white shadow-md rounded-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Starlink Record</h2>
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                {success && <p className="text-center text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">ID (STLyymm) e.g., STL2401:</span>
                        <input
                            type="text"
                            name="id"
                            value={starlink.id}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Full Rigging:</span>
                        <input
                            type="number"
                            step="0.01"
                            name="full_rigging"
                            value={starlink.full_rigging}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Polylining:</span>
                        <input
                            type="number"
                            step="0.01"
                            name="polylining"
                            value={starlink.polylining}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Fumigation:</span>
                        <input
                            type="number"
                            step="0.01"
                            name="fumigation"
                            value={starlink.fumigation}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Container Repairs:</span>
                        <input
                            type="number"
                            step="0.01"
                            name="container_repairs"
                            value={starlink.container_repairs}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Container Spare Sales:</span>
                        <input
                            type="number"
                            step="0.01"
                            name="container_spare_sales"
                            value={starlink.container_spare_sales}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Container Washing:</span>
                        <input
                            type="number"
                            step="0.01"
                            name="container_washing"
                            value={starlink.container_washing}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">GOH BD:</span>
                        <input
                            type="number"
                            step="0.01"
                            name="goh_bd"
                            value={starlink.goh_bd}
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
                            value={starlink.date}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Add Starlink
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddStarlink;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CESList = () => {
    const [ces, setCES] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCES();
    }, []);

    const fetchCES = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ces`);
            setCES(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/ces/${id}`);
            fetchCES();
        } catch (error) {
            console.error('Error deleting data:', error);
            setError('Failed to delete entry. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">CES Data</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {loading ? (
                    <p className="text-gray-700">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead className="bg-gray-200 border-b border-gray-300">
                                <tr>
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">CDL Dry Docking</th>
                                    <th className="px-4 py-2 text-left">Afloat repair jobs: No. of Vessels</th>
                                    <th className="px-4 py-2 text-left">Afloat repair jobs: No. of Jobs</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ces.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-300">
                                        <td className="px-4 py-2">{item.id}</td>
                                        <td className="px-4 py-2">{item.cdl_dry_docking}</td>
                                        <td className="px-4 py-2">{item.no_of_vessels}</td>
                                        <td className="px-4 py-2">{item.no_of_jobs}</td>
                                        <td className="px-4 py-2">{item.date}</td>
                                        <td className="px-4 py-2">
                                            <button 
                                                onClick={() => handleDelete(item.id)} 
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CESList;

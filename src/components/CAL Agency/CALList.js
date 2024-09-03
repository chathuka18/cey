import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CALList = () => {
    const [cal, setCAL] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCAL();
    }, []);

    const fetchCAL = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cal`);
            setCAL(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/cal/${id}`);
            fetchCAL();
        } catch (error) {
            console.error('Error deleting data:', error);
            setError('Failed to delete entry. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">CAL Agency Data</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {loading ? (
                    <p className="text-gray-600">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="py-2 px-4 text-left text-gray-600">ID</th>
                                    <th className="py-2 px-4 text-left text-gray-600">Crew Change Total</th>
                                    <th className="py-2 px-4 text-left text-gray-600">Casual Caller Ops</th>
                                    <th className="py-2 px-4 text-left text-gray-600">Date</th>
                                    <th className="py-2 px-4 text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cal.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-2 px-4 text-gray-700">{item.id}</td>
                                        <td className="py-2 px-4 text-gray-700">{item.crew_change}</td>
                                        <td className="py-2 px-4 text-gray-700">{item.casual_caller_ops}</td>
                                        <td className="py-2 px-4 text-gray-700">{item.date}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
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

export default CALList;

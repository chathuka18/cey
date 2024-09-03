import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CalifolinkList = () => {
    const [califolink, setCalifolink] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCalifolink();
    }, []);

    const fetchCalifolink = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cll`);
            setCalifolink(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/cll/${id}`);
            fetchCalifolink();
        } catch (error) {
            console.error('Error deleting data:', error);
            setError('Failed to delete entry. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Califolink Data</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {loading ? (
                    <p className="text-gray-600">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-md">
                            <thead className="bg-gray-200 text-gray-600">
                                <tr>
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Container Fleet</th>
                                    <th className="py-2 px-4 border-b">Container Onhire</th>
                                    <th className="py-2 px-4 border-b">Utilization Container</th>
                                    <th className="py-2 px-4 border-b">Machine Fleet</th>
                                    <th className="py-2 px-4 border-b">Machine Onhire</th>
                                    <th className="py-2 px-4 border-b">Utilization Machine</th>
                                    <th className="py-2 px-4 border-b">Transport Jobs</th>
                                    <th className="py-2 px-4 border-b">No of KM</th>
                                    <th className="py-2 px-4 border-b">Avg KM</th>
                                    <th className="py-2 px-4 border-b">TEU</th>
                                    <th className="py-2 px-4 border-b">Eco</th>
                                    <th className="py-2 px-4 border-b">Clearing</th>
                                    <th className="py-2 px-4 border-b">Fabrication</th>
                                    <th className="py-2 px-4 border-b">Date</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {califolink.map((item) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="py-2 px-4">{item.id}</td>
                                        <td className="py-2 px-4">{item.container_fleet}</td>
                                        <td className="py-2 px-4">{item.container_onhire}</td>
                                        <td className="py-2 px-4">{item.untilzation_container}</td>
                                        <td className="py-2 px-4">{item.machine_fleet}</td>
                                        <td className="py-2 px-4">{item.machine_onhire}</td>
                                        <td className="py-2 px-4">{item.untilzation_machine}</td>
                                        <td className="py-2 px-4">{item.transport_jobs}</td>
                                        <td className="py-2 px-4">{item.no_of_km}</td>
                                        <td className="py-2 px-4">{item.avg_km}</td>
                                        <td className="py-2 px-4">{item.teu}</td>
                                        <td className="py-2 px-4">{item.eco}</td>
                                        <td className="py-2 px-4">{item.clearing}</td>
                                        <td className="py-2 px-4">{item.fabrication}</td>
                                        <td className="py-2 px-4">{item.date}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
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

export default CalifolinkList;

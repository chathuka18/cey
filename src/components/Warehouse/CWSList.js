import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CWSList = () => {
    const [cws, setCWS] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCWS();
    }, []);

    const fetchCWS = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cws`);
            setCWS(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/cws/${id}`);
            fetchCWS();
        } catch (error) {
            console.error('Error deleting data:', error);
            setError('Failed to delete entry. Please try again.');
        }
    };

    return (
        <div className="company-list min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            <div className="section w-full max-w-5xl bg-white shadow-md rounded-md p-8">
                <h2 className="section-title text-2xl font-bold mb-6 text-center">CWS Data</h2>
                {loading && <p className="text-center text-blue-500">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-2 border">ID</th>
                                    <th className="p-2 border">WH 01- Capacity</th>
                                    <th className="p-2 border">WH 01- Utilization</th>
                                    <th className="p-2 border">WH 01- Utilization %</th>
                                    <th className="p-2 border">WH 02- Capacity</th>
                                    <th className="p-2 border">WH 02- Utilization</th>
                                    <th className="p-2 border">WH 02- Utilization %</th>
                                    <th className="p-2 border">Value Added Services (LKR)</th>
                                    <th className="p-2 border">Date</th>
                                    <th className="p-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cws.map((item) => (
                                    <tr key={item.id} className="odd:bg-white even:bg-gray-100">
                                        <td className="p-2 border">{item.id}</td>
                                        <td className="p-2 border">{item.wh01_capacity}</td>
                                        <td className="p-2 border">{item.wh01_utilization}</td>
                                        <td className="p-2 border">{item.wh01_utilization_percentage}</td>
                                        <td className="p-2 border">{item.wh02_capacity}</td>
                                        <td className="p-2 border">{item.wh02_utilization}</td>
                                        <td className="p-2 border">{item.wh02_utilization_percentage}</td>
                                        <td className="p-2 border">{item.value_added_services}</td>
                                        <td className="p-2 border">{item.date}</td>
                                        <td className="p-2 border">
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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

export default CWSList;

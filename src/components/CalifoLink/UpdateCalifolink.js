import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CalifolinkList = () => {
    const [califolink, setCalifolink] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [updateData, setUpdateData] = useState(null);

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

    const handleUpdate = () => {
        if (califolink.length === 0) return;
        const latestRecord = califolink.reduce((latest, current) => {
            return new Date(current.date) > new Date(latest.date) ? current : latest;
        });
        setUpdateData({ ...latestRecord });
        setUpdateMode(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prev) => ({ ...prev, [name]: value }));
    };

    const submitUpdate = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/cll/${updateData.id}`, updateData);
            setUpdateMode(false);
            fetchCalifolink();
            alert('Record updated successfully');
        } catch (error) {
            console.error('Error updating data:', error);
            setError('Failed to update record. Please try again.');
        }
    };

    const fieldLabels = {
        id: 'ID',
        container_fleet: 'Container Fleet',
        container_onhire: 'Container Onhire',
        untilzation_container: 'Utilization Container',
        machine_fleet: 'Machine Fleet',
        machine_onhire: 'Machine Onhire',
        untilzation_machine: 'Utilization Machine',
        transport_jobs: 'Transport Jobs',
        no_of_km: 'No of KM',
        avg_km: 'Avg KM',
        teu: 'TEU',
        eco: 'Eco',
        clearing: 'Clearing',
        fabrication: 'Fabrication',
        date: 'Date',
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Califolink Data</h2>

                <div className="mb-4 flex justify-between">
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
                        disabled={updateMode || califolink.length === 0}
                    >
                        Update Latest Record
                    </button>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {loading ? (
                    <p className="text-gray-600">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-md">
                            <thead className="bg-gray-200 text-gray-600">
                                <tr>
                                    {Object.keys(fieldLabels).map((key) => (
                                        <th key={key} className="py-2 px-4 border-b">
                                            {fieldLabels[key]}
                                        </th>
                                    ))}
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {califolink.map((item) => (
                                    <tr key={item.id} className="border-t">
                                        {Object.keys(fieldLabels).map((key) => (
                                            <td key={key} className="py-2 px-4">
                                                {item[key]}
                                            </td>
                                        ))}
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

                {updateMode && (
                    <div className="mt-6 p-4 border border-gray-200 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">Update Latest Record</h3>
                        {Object.keys(updateData).map((key) => (
                            <div key={key} className="mb-3">
                                <label className="block text-sm font-medium text-gray-700">{fieldLabels[key]}</label>
                                <input
                                    type={key === 'date' ? 'date' : 'number'}
                                    name={key}
                                    value={updateData[key]}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                    disabled={key === 'id'}
                                    readOnly={key === 'id'}
                                />
                            </div>
                        ))}
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setUpdateMode(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitUpdate}
                                className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
                            >
                                Submit Update
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalifolinkList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CeymedList = () => {
    const [ceymed, setCeymed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [updateMode, setUpdateMode] = useState(false);
    const [updateData, setUpdateData] = useState(null);

    useEffect(() => {
        fetchCeymed();
    }, []);

    const fetchCeymed = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ceymed`, { timeout: 10000 });
            setCeymed(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response) {
                setError(`Failed to fetch data: ${error.response.status} ${error.response.statusText}`);
            } else if (error.request) {
                setError('Failed to fetch data: No response received from server');
            } else {
                setError(`Failed to fetch data: ${error.message}`);
            }
            setLoading(false);
        }
    };

    const handleSort = (field) => {
        const isAsc = sortField === field && sortDirection === 'asc';
        setSortField(field);
        setSortDirection(isAsc ? 'desc' : 'asc');
        const sortedData = [...ceymed].sort((a, b) => {
            if (a[field] < b[field]) return isAsc ? -1 : 1;
            if (a[field] > b[field]) return isAsc ? 1 : -1;
            return 0;
        });
        setCeymed(sortedData);
    };

    const handleUpdate = () => {
        if (ceymed.length === 0) return;
        const latestRecord = ceymed.reduce((latest, current) => {
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
            await axios.put(`${process.env.REACT_APP_API_URL}/api/ceymed/${updateData.id}`, updateData);
            setUpdateMode(false);
            fetchCeymed();
            alert('Record updated successfully');
        } catch (error) {
            console.error('Error updating data:', error);
            setError('Failed to update record. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/ceymed/${id}`);
            fetchCeymed();
        } catch (error) {
            console.error('Error deleting data:', error);
            setError('Failed to delete entry. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ceymed Data</h2>
                <div className="mb-6 flex justify-between">
                    <button
                        onClick={fetchCeymed}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
                        disabled={updateMode || ceymed.length === 0}
                    >
                        Update Latest Record
                    </button>
                </div>
                {updateMode ? (
                    <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">Update Latest Record</h3>
                        {Object.keys(updateData).map((key) => (
                            <div key={key} className="mb-3">
                                <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ')}</label>
                                <input
                                    type={key === 'date' ? 'date' : key === 'id' ? 'text' : 'number'}
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
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['id', 'no_of_reports', 'no_of_chanelling_patients', 'no_of_consultant_visited', 'no_of_cooperate_staff_medicals', 'no_of_prescriptions', 'no_of_OPD', 'no_of_ETU', 'no_of_contribution_center', 'date'].map((field) => (
                                        <th
                                            key={field}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSort(field)}
                                        >
                                            {field.replace(/_/g, ' ')}
                                            {sortField === field && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {ceymed.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.no_of_reports}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.no_of_chanelling_patients}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.no_of_consultant_visited}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.no_of_cooperate_staff_medicals}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.no_of_prescriptions}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.no_of_OPD}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.no_of_ETU}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.no_of_contribution_center}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.date)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => handleDelete(item.id)} 
                                                className="text-red-600 hover:text-red-800"
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

export default CeymedList;
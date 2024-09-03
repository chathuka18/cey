import React, { useState } from 'react';
import axios from 'axios';
import calImg from '../../img/nvocc.jpg';

const AddCalifolink = () => {
    const [califolink, setCalifolink] = useState({
        id: '',
        container_fleet: '',
        container_onhire: '',
        untilzation_container: '',
        machine_fleet: '',
        machine_onhire: '',
        untilzation_machine: '',
        transport_jobs: '',
        no_of_km: '',
        avg_km: '',
        teu: '',
        eco: '',
        clearing: '',
        fabrication: '',
        date: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCalifolink({ ...califolink, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/cll`, {
                ...califolink,
            });
            setSuccess('Califolink added successfully!');
            setError(null);
            setCalifolink({
                id: '',
                container_fleet: '',
                container_onhire: '',
                untilzation_container: '',
                machine_fleet: '',
                machine_onhire: '',
                untilzation_machine: '',
                transport_jobs: '',
                no_of_km: '',
                avg_km: '',
                teu: '',
                eco: '',
                clearing: '',
                fabrication: '',
                date: ''
            });
        } catch (error) {
            console.error('There was an error adding the Califolink!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the Califolink!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${calImg})` }}>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Califolink</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            ID (CLLyymmww) eg(CLL240101):
                            <input
                                type="text"
                                name="id"
                                value={califolink.id}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Container Renting: Fleet:
                            <input
                                type="number"
                                name="container_fleet"
                                value={califolink.container_fleet}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Container Renting: On Hire:
                            <input
                                type="number"
                                name="container_onhire"
                                value={califolink.container_onhire}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Utilization Container %:
                            <input
                                type="number"
                                name="untilzation_container"
                                value={califolink.untilzation_container}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Machine Renting: Fleet:
                            <input
                                type="number"
                                name="machine_fleet"
                                value={califolink.machine_fleet}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Machine Renting: On Hire:
                            <input
                                type="number"
                                name="machine_onhire"
                                value={califolink.machine_onhire}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Utilization Machines %:
                            <input
                                type="number"
                                name="untilzation_machine"
                                value={califolink.untilzation_machine}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Transport Jobs:
                            <input
                                type="number"
                                name="transport_jobs"
                                value={califolink.transport_jobs}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Total Number of KMs:
                            <input
                                type="number"
                                name="no_of_km"
                                value={califolink.no_of_km}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Average Revenue/ Km:
                            <input
                                type="number"
                                name="avg_km"
                                value={califolink.avg_km}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            No. of TEU's:
                            <input
                                type="number"
                                name="teu"
                                value={califolink.teu}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            E/C/O:
                            <input
                                type="number"
                                name="eco"
                                value={califolink.eco}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Clearing:
                            <input
                                type="number"
                                name="clearing"
                                value={califolink.clearing}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="block text-gray-700 font-medium">
                            Fabrication:
                            <input
                                type="number"
                                name="fabrication"
                                value={califolink.fabrication}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input type="date" name="date" value={califolink.date} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Califolink
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCalifolink;

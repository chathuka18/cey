import React, { useState } from 'react';
import axios from 'axios';

const Technical = () => {
    const [msts, setMSTS] = useState({
        no_of_spare_parts_supplies: '',
        no_of_reefer_repairs_technical: '',
        no_of_inspections_technical: '',
        date: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMSTS({ ...msts, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/msts-technical`, msts);
            setSuccess('MSTS added successfully!');
            setError(null);
            setMSTS({
                no_of_spare_parts_supplies: '',
                no_of_reefer_repairs_technical: '',
                no_of_inspections_technical: '',
                date: '',
            });
        } catch (error) {
            console.error('There was an error adding the MSTS!', error);
            if (error.response && error.response.status === 409) {
                setError('A record with this ID already exists. Please use a different ID.');
            } else {
                setError('There was an error adding the MSTS!');
            }
            setSuccess(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Marine Survey & Technology Services</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={msts.date}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    </div>
                  
                    {/* Technical Section */}
                    <div className='border-2 border-blue-500 rounded-lg p-4'>
                        <h3 className="text-xl font-semibold mb-4 text-blue-500">Technical Department</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">No. of Spare Part Supplies:</label>
                            <input
                                type="number"
                                name="no_of_spare_parts_supplies"
                                value={msts.no_of_spare_parts_supplies}
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">No. of Reefer Repairs:</label>
                            <input
                                type="number"
                                name="no_of_reefer_repairs_technical"
                                value={msts.no_of_reefer_repairs_technical}
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">No. of Inspections:</label>
                            <input
                                type="number"
                                name="no_of_inspections_technical"
                                value={msts.no_of_inspections_technical}
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        </div>
                    </div>

                    
                   
                    


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gradient-to-l transform hover:scale-105 transition-transform duration-300"
                    >
                        Add Data
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Technical;

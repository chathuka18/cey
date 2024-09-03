import React, { useState } from 'react';
import axios from 'axios';
import cheImg from '../../img/ceymed.jpg';

const AddCeymed = () => {
    const [formData, setFormData] = useState({
        id: '',
        no_of_reports: '',
        no_of_chanelling_patients: '',
        no_of_consultant_visited: '',
        no_of_cooperate_staff_medicals: '',
        no_of_prescriptions: '',
        no_of_OPD: '',
        no_of_ETU: '',
        no_of_contribution_center: '',
        date: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/ceymed`, {
                ...formData,
                currentDate: new Date().toISOString().split('T')[0] 
            });
            setMessage('Ceymed data submitted successfully!');
            setFormData({
                id: '',
                no_of_reports: '',
                no_of_chanelling_patients: '',
                no_of_consultant_visited: '',
                no_of_cooperate_staff_medicals: '',
                no_of_prescriptions: '',
                no_of_OPD: '',
                no_of_ETU: '',
                no_of_contribution_center: '',
                date: ''
            });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setMessage('Error: An entry with this ID already exists.');
            } else {
                setMessage('Error submitting data. Please try again.');
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${cheImg})` }}>
            <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ceymed Healthcare Services</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: 'ID (CHEyymmww) eg(CHE240101):', name: 'id', type: 'text' },
                        { label: 'Number of Reports:', name: 'no_of_reports', type: 'number' },
                        { label: 'Number of Channelling Patients:', name: 'no_of_chanelling_patients', type: 'number' },
                        { label: 'Number of Consultants Visited:', name: 'no_of_consultant_visited', type: 'number' },
                        { label: 'Number of Cooperate Staff Medicals:', name: 'no_of_cooperate_staff_medicals', type: 'number' },
                        { label: 'Number of Prescriptions:', name: 'no_of_prescriptions', type: 'number' },
                        { label: 'Number of OPD:', name: 'no_of_OPD', type: 'number' },
                        { label: 'Number of ETU:', name: 'no_of_ETU', type: 'number' },
                        { label: 'Number of Contribution Center:', name: 'no_of_contribution_center', type: 'number' },
                        { label: 'Date:', name: 'date', type: 'date' }
                    ].map(({ label, name, type }) => (
                        <div key={name} className="form-group">
                            <label htmlFor={name} className="block text-gray-700 font-medium mb-1">{label}</label>
                            <input 
                                type={type} 
                                id={name} 
                                name={name} 
                                value={formData[name]} 
                                onChange={handleChange} 
                                required 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>
                {message && <p className={`mt-4 ${message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default AddCeymed;

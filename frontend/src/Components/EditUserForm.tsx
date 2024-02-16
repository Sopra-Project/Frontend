import React, { useState } from 'react';

const EditUserForm = () => {
    // Tilstand for skjemafeltene
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        role: 'User', // Setter standardverdien til 'User'
        building: '',
    });

    // Funksjon for å oppdatere tilstanden til skjemafeltene
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Funksjon for å håndtere innsending av skjemaet
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Legg til logikk for å sende brukerdata til serveren og håndtere responsen
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit}>
                {/* Skjemafelter */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select id="role" name="role" value={userData.role} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="building" className="block text-sm font-medium text-gray-700">Building</label>
                    <input type="text" id="building" name="building" value={userData.building} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
                </div>
                {/* Legg til en "Lagre endringer" -knapp */}
                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">Save Changes</button>
            </form>
        </div>
    );
};

export default EditUserForm;

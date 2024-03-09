import React, { useEffect, useState } from 'react';
import AdminService from "../../services/AdminService";
import { User } from "../../types/types";

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);

    useEffect(() => {
        AdminService.getAllUsers().then((data) => {
            setUsers(data);
            setLoading(false);
        }).catch((error) => {
            setError(String(error));
            setLoading(false);
        });
    }, []);

    const CreateUserModal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;

        const handleSubmit = (event) => {
            event.preventDefault();
            const userName = event.target.userName.value;
            const userEmail = event.target.userEmail.value;
            const userRole = event.target.userRole.value;
            console.log("Oppretter bruker:", userName, userEmail, userRole);
            onClose();
        };

        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Opprett Ny Bruker</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Navn</label>
                            <input type="text" name="userName" required className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">E-post</label>
                            <input type="email" name="userEmail" required className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">Rolle</label>
                            <select name="userRole" className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
                                <option>Admin</option>
                                <option>Bruker</option>
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <button type="submit" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md m-2">Opprett</button>
                            <button type="button" onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md m-2">Lukk vindu</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching users: {error}</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.role.authority}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {/* Handling buttons for editing or deleting users could be added here */}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <button onClick={() => setShowCreateUserModal(true)} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mx-8 my-4">Opprett Ny Bruker</button>
            </div>
            <CreateUserModal isOpen={showCreateUserModal} onClose={() => setShowCreateUserModal(false)} />
        </div>
    );
};

export default UsersTable;

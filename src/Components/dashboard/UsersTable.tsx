
import React, { useState, useEffect } from 'react';
import { User } from '../../types/types';
import { FetchHelper } from '../../utils/FetchHelper';


const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState('');


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await FetchHelper.get('http://localhost:8080/api/user/all');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError(error instanceof Error ? error.toString() : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUserClick = () => setIsModalOpen(true);
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setSelectedRole('');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const roleId = selectedRole === 'admin' ? 1 : 2;
        const userData = { name, email, roleId };

        try {
            const response = await FetchHelper.post('http://localhost:8080/api/user', userData);
            if (response.ok) {
                const newUser: User = await response.json();
                setUsers([...users, newUser]);
                handleCloseModal();
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
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
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={() => {/* Handle edit */}} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            <button onClick={() => {/* Handle delete */}} className="text-red-600 hover:text-red-900 ml-4">Delete</button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-end mt-4">
                <button onClick={handleCreateUserClick} className="px-8 py-2 bg-marine-blue-dark text-white rounded-md hover:bg-indigo-700">Create New User</button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
                                <select id="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none">
                                    <option value="">Select a role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marine-blue-dark hover:bg-marine-blue">Create User</button>
                        </form>
                        <button onClick={handleCloseModal} className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersTable;

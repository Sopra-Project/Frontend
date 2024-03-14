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
        AdminService.getAllUsers().then((data) => {
            setUsers(data);
            setLoading(false);
        }).catch((error) => {
            setError(String(error));
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
                <button onClick={() => setShowCreateUserModal(true)} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mx-8 my-4">Opprett Ny Bruker</button>
            </div>
            <CreateUserModal isOpen={showCreateUserModal} onClose={() => setShowCreateUserModal(false)} />
        </div>
    );
};

export default UsersTable;

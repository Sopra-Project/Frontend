import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'; // Importer "edit" ikonet
import { User } from '../../types/types';
import AdminService from "../../services/AdminService";

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        AdminService.getAllUsers()
            .then((users) => {
                setUsers(users);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [users]);

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
            const response = await AdminService.createUser(userData);
            if (response.ok) {
                setUsers([]);
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
        <div className="overflow-x-auto pb-5 pt-5 shadow-xl bg-gray-100">
            {/* Kortoppsett for mindre skjermer */}
            <div className="md:hidden">
                {users.map((user) => (
                    <div key={user.id} className="bg-white shadow overflow-hidden rounded-lg mb-4 p-4">
                        <div><strong>Navn:</strong> {user.name}</div>
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Rolle:</strong> {user.role.authority}</div>
                        <div className="flex justify-end space-x-2 mt-2">
                            <button onClick={() => { /* Implementer redigeringsfunksjonalitet */ }} className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button onClick={() => { /* Implementer slettefunksjonalitet */ }} className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full overflow-hidden sm:rounded-md shadow-xl">
                <table className="w-full bg-white divide-y divide-gray-200 rounded-md">
                    <thead style={{backgroundColor: '#F3F2EE'}} className="shadow-3xl">
                    <tr>
                        <th className="px-6 py-3 p-4 text-sm font-semibold tracking-wide text-left">Navn</th>
                        <th className="px-6 py-3 p-4 text-sm font-semibold tracking-wide text-left">Email</th>
                        <th className="px-6 py-3 p-4 text-sm font-semibold tracking-wide text-left">Rolle</th>
                        <th className="px-6 py-3 p-4 text-sm font-semibold tracking-wide text-left">Handlinger</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap">{user.name}</td>
                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap">{user.email}</td>
                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap">{user.role.authority}</td>
                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap">
                                <button onClick={() => { /* Handle edit */ }} className="px-6 py-3 p-4 text-sm font-semibold tracking-wide text-left">
                                    <FontAwesomeIcon icon={faEdit} className="mx-2"/> {/* Legg til edit ikonet */}
                                </button>
                                <button onClick={() => { /* Handle delete */ }} className="bg-red-700 hover:bg-red-800 text-white py-2 px-3 rounded-md">
                                    <FontAwesomeIcon icon={faTrash} className="mx-2"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end mt-4">
                <button onClick={handleCreateUserClick}
                        className="btn text-white font-semibold border-gray-700 transition-colors duration-300 px-8 py-2 rounded-lg border-2 border-white hover:border-gray-500">
                    Lag ny bruker
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"/>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-medium text-gray-700">Email:</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"/>
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
                                <select id="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none">
                                    <option value="">Select a role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <button type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marine-blue-dark hover:bg-marine-blue">
                                Create User
                            </button>
                        </form>
                        <button onClick={handleCloseModal}
                                className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersTable;




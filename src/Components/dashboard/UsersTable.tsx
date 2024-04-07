import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
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
        if (users.length > 0) return;
        AdminService.getAllUsers().then((users) => {
            setUsers(users);
            setLoading(false);

        }).catch((error) => {
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
        const userData = {name, email, roleId};

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
            <div className="md:hidden">
                {users.map((user) => (
                    <div key={user.id} className="p-4 m-4 bg-white rounded-lg shadow-lg">
                        <div><strong>Name:</strong> {user.name}</div>
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Role:</strong> {user.role.authority}</div>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="hidden md:block">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead style={{backgroundColor: '#F3F2EE'}} className="shadow-3xl">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Navn</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rolle</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Handlinger</th>

                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role.authority}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handleCreateUserClick} className="btn text-white font-semibold border-gray-700 transition-colors duration-300 px-8 py-2 rounded-lg border-2 border-white hover:border-gray-500">
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
                                    <option value="">Velg rolle</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <button type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marine-blue-dark hover:bg-marine-blue">
                                Lag bruker
                            </button>
                        </form>
                        <button onClick={handleCloseModal}
                                className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">
                            Lukk
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersTable;




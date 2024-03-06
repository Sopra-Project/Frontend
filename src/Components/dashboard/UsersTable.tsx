import React, {useEffect, useState} from 'react';
import AdminService from "../../services/AdminService";
import {User} from "../../types/types";


const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        AdminService.getAllUsers().then((data) => {
            setUsers(data);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, []);

    const handleEditClick = () => {
        //
    };

    const handleDeleteClick = () => {
        //
    };

    const handleCreateUserClick = () => {
        //
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
                            <button onClick={handleEditClick}
                                    className="px-4 py-2 bg-marine-blue-dark text-white rounded-md hover:bg-indigo-700">Edit
                            </button>
                            <button onClick={handleDeleteClick}
                                    className="px-4 py-2 ml-2 bg-marine-blue-dark text-white rounded-md hover:bg-indigo-700">Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <button onClick={handleCreateUserClick}
                        className="px-8 py-2 bg-marine-blue-dark text-white rounded-md hover:bg-indigo-700">Opprett Ny
                    Bruker
                </button>
            </div>
        </div>
    );
};

export default UsersTable;

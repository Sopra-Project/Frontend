import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

interface Role {
    id: number;
    authority: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    building: {
        id: number;
        name: string;
    };
}

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
            const fetchSessions = async () => {
                    try {
                        const response = await fetch('http://localhost:8080/api/user/all',
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
                                }
                            }
                        );
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const data: User[] = await response.json();
                        setUsers(data);
                    } catch
                        (error) {
                        if (error instanceof Error) {
                            setError(error.toString());
                        } else {
                            setError('An unknown error occurred');
                        }
                    } finally {
                        setLoading(false);
                    }
                }
            ;

            fetchSessions();
        }, []
    )
    ;

    const handleEditClick = () => {
        navigate('/edit-user');
    };

    const handleDeleteClick = () => {
        navigate('/delete-confirmation'); // Navigerer til delete-confirmation siden
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching sessions: {error}</p>;

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
                            <button onClick={handleEditClick} className="px-4 py-2 bg-marine-blue-dark text-white rounded-md hover:bg-indigo-700">Edit</button>
                            <button onClick={handleDeleteClick} className="px-4 py-2 ml-2 bg-marine-blue-dark text-white rounded-md hover:bg-indigo-700">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>


    );
};

export default UsersTable;
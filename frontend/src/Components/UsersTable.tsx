// UsersTable.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Interface definitions
interface Role {
    id: number;
    authority: string;
}

interface User {
    id: number;
    registrationNumber: string;
    startTime: string;
    endTime: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: Role;
        building: {
            id: number;
            name: string;
        };
    };
    status: {
        id: number;
        name: string;
    };
}

const UsersTable = () => {
    const [sessions, setSessions] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch('https://gjesteparkering-faa7b9adf6e4.herokuapp.com/api/parking/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: User[] = await response.json();
                setSessions(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.toString());
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    const handleEditClick = () => {
        navigate('/edit-user');
    };

    const handleDeleteClick = () => {
        navigate('/delete-confirmation'); // Navigerer til delete-confirmation siden
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching sessions: {error}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sessions.map((session) => (
                <div key={session.id} className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-2">{session.user.name}</h2>
                    <p className="text-gray-600 mb-2">Email: {session.user.email}</p>
                    <p className="text-gray-600 mb-2">Role: {session.user.role.authority}</p>
                    <p className="text-gray-600 mb-2">Building: {session.user.building.name}</p>
                    <p className="text-gray-600 mb-2">Registration Number: {session.registrationNumber}</p>
                    <p className="text-gray-600 mb-2">Start Time: {session.startTime}</p>
                    <p className="text-gray-600 mb-2">End Time: {session.endTime}</p>
                    <p className="text-gray-600 mb-2">Status: {session.status.name}</p>
                    <div className="flex justify-end mt-4">
                        <button onClick={handleEditClick} className="px-4 py-2 bg-marine-blue-dark text-white rounded-md hover:bg-indigo-700">Edit</button>
                        <button onClick={handleDeleteClick} className="px-4 py-2 ml-2 bg-marine-blue-dark text-white rounded-md hover:bg-indigo-700">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsersTable;

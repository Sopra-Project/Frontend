import React, { useState, useEffect } from 'react';

// Interface-definisjoner
interface Role {
    id: number;
    authority: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    totalparkingspots: number;
    totalparkingspotsavailable: number;
}

const UsersTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/all');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: User[] = await response.json();
                setUsers(data);
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

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching users: {error}</p>;

    return (
        <table className="w-full mt-5 border-collapse border border-black">
            <thead className="bg-marine-blue-dark text-white">
            <tr>
                <th className="border border-black p-2">Brukere</th>
                <th className="border border-black p-2">Rolle</th>
                <th className="border border-black p-2">Oppgaver</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={user.id} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                    <td className="border border-black p-2">{user.name}</td>
                    <td className="border border-black p-2">{user.role.authority}</td>
                    <td className="border border-black p-2">
                        <button className="cursor-pointer px-4 py-2 mr-2 border-none rounded bg-blue-500 text-white transition-colors duration-300 hover:bg-blue-600">Endre</button>
                        <button className="cursor-pointer px-4 py-2 border-none rounded bg-red-500 text-white transition-colors duration-300 hover:bg-red-600">Slett</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UsersTable;

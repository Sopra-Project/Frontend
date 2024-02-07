import React from 'react';

const UsersTable = () => {
    const users = [
        { id: 1, name: 'Bruker 1', role: 'Superbruker' },
        { id: 2, name: 'Bruker 2', role: 'Bruker' },
        { id: 3, name: 'Bruker 3', role: 'Superbruker' },
        { id: 4, name: 'Bruker 4', role: 'Bruker' },
        { id: 5, name: 'Bruker 5', role: 'Bruker' },
        { id: 6, name: 'Bruker 6', role: 'Bruker' },
        { id: 7, name: 'Bruker 7', role: 'Bruker' },


    ];

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
                    <td className="border border-black p-2">{user.role}</td>
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

// Components/UsersTable.tsx
 const UsersTable = () => {
    // Her skal du legge til logikken for å hente brukerdata
    const users = [
        { id: 1, name: 'Bruker 1', role: 'Superbruker' },
        { id: 2, name: 'Bruker 2', role: 'Bruker' },
        // ... flere brukere
    ];

    return (
        <table>
            <thead>
            <tr>
                <th>Brukere</th>
                <th>Rolle</th>
                <th>Oppgaver</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>
                        <button>Endre</button>
                        <button>Slett</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};
export default UsersTable;
import React, { useState } from 'react';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Forhindrer standard skjemainnsending

        // Definerer API-endepunktet
        const apiUrl = 'http://localhost:8080/api/user';

        // Oppretter brukerobjektet som skal sendes
        const userData = { name, email, role };

        try {
            // Utfører POST-forespørsel til API-endepunktet med brukerdata
            const response = await fetch(apiUrl, {
                method: 'POST', // HTTP-metode
                headers: {
                    'Content-Type': 'application/json', // Informerer serveren om innholdstypen
                },
                body: JSON.stringify(userData), // Konverterer brukerdata til JSON-streng
            });

            if (response.ok) {
                // Hvis forespørselen er vellykket, logg en suksessmelding
                console.log("User created successfully");
                // Tømmer skjemaet ved å sette tilbake tilstanden
                setName('');
                setEmail('');
                setRole('');
            } else {
                // Hvis serveren returnerer en feil, logg feilen
                throw new Error('Failed to create user');
            }
        } catch (error) {
            // Logger eventuelle feil som oppstår under nettverksforespørselen
            console.error("Error creating user:", error);
        }
    };

    const handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            console.log('Escape key pressed');
            // Implementer logikk for å lukke popup eller tilbakestille tilstand her om nødvendig
        }
    };

    return (
        <div onKeyDown={handleEscape} className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-5 text-gray-900">Opprett Ny Bruker</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Navn:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-post:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rolle:</label>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">Velg en rolle</option>
                        <option value="admin">Admin</option>
                        <option value="user">Bruker</option>
                    </select>
                </div>
                <button type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marine-blue-dark hover:bg-marine-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marine-blue-dark">
                    Opprett Bruker
                </button>
            </form>
        </div>
    );
};

export default CreateUser;

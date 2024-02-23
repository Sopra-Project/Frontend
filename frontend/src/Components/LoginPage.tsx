// LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateUser from './CreateUser';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Noe gikk galt ved sending av e-post.');
            }

            alert('En verifiseringskode er sendt til din e-postadresse.');
            navigate('/verify-code');
        } catch (error) {
            if (error instanceof Error) {
                alert('Feil ved innlogging: ' + error.message);
            } else {
                alert('Feil ved innlogging: En ukjent feil oppstod.');
            }
        }
    };

    const handleCreateUser = () => {
        setShowCreateUserPopup(true);
    };

    const handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            setShowCreateUserPopup(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Logg Inn</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-post</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marine-blue-dark hover:bg-marine-blue">
                    Send Verifiseringskode
                </button>
                <button
                    type="button"
                    onClick={handleCreateUser}
                    className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marine-blue-dark hover:bg-marine-blue">
                    Opprett Ny Bruker
                </button>
            </form>
            {showCreateUserPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onKeyDown={handleEscape}>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <CreateUser />
                        <button
                            className="absolute top-2 right-2 px-3 py-1 bg-gray-200 text-gray-800 rounded"
                            onClick={() => setShowCreateUserPopup(false)}
                        >
                            Lukk
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;



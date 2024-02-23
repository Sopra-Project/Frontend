// Components/VerifyCodePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyCodePage = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error('Verifisering mislyktes');
            }

            // Behandle en vellykket verifisering her, f.eks. navigere til dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            // Her kan du håndtere feil, f.eks. vise en feilmelding til brukeren
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">Verifiseringskode</label>
                    <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)}
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required/>
                </div>
                <button type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marine-blue-dark hover:bg-marine-blue">
                    Verifiser Kode
                </button>
            </form>
        </div>
    );
};

export default VerifyCodePage;

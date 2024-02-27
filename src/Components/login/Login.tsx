import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import isDev from "../../utils/DevDetect";
import { useAuthContext } from "../../hooks/useAuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const { login, sendCode } = useLogin();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Anta at login funksjonen nå tar både e-post og kode, eller tilpass etter faktisk bruk
        login(email); // Tilpass denne til din faktisk implementerte logikk
    };

    // Implementasjon for sendCode kommentert ut inntil videre
    /*
    const handleSendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Implementer logikken for å faktisk sende kode her
        console.log("Kode sendt til:", email);
    };
    */

    useEffect(() => {
        if (user && isDev()) {
            if(user.role === 'SUPER_ADMIN') {
                navigate('/superadmin');
            } else {
                navigate('/dashboard'); // Endret fra '/' for å matche oppgavens instruksjoner
            }
        }
    }, [navigate, user]);

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Logg Inn</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-post</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Skriv inn e-post her"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">Kode</label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Skriv inn kode her"
                    />
                </div>
                {/* Send kode-knappen er kommentert ut inntil videre
                <button
                    onClick={handleSendCode}
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 mb-4">
                    Send Kode
                </button>
                */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700">
                    Logg Inn
                </button>
            </form>
        </div>
    );
};

export default Login;
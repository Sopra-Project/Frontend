import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLogin} from "../../hooks/useLogin";
import isDev from "../../utils/DevDetect";
import {useAuthContext} from "../../hooks/useAuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const {login, sendCode} = useLogin();
    const {user} = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void login(email);
    };

    useEffect(() => {
        if (user) {
            if (user.role === 'SUPER_ADMIN') {
                navigate('/superadmin');
            } else {
                navigate('/dashboard');
            }
        }
    }, [navigate, user]);

    return (
        <div className="container mx-auto p-6 bg-white max-w-md mx-auto ">
            <h1 className="text-3xl font-bold mb-4">Logg Inn</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-base font-medium text-gray-700">E-post</label>
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
                    <label htmlFor="code" className="block text-base font-medium text-gray-700">Kode</label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Skriv inn kode her"
                    />
                </div>
                {!isDev() && (
                    <button
                        onClick={() => sendCode(code, email)}
                        type="button"
                        style={{ marginBottom: '16px', marginTop: '32px' }}
                        className="btn text-white font-semibold py-3 px-6 rounded-lg shadow-md"
                    >
                        Login
                    </button>
                )}
                <button
                    type="submit"
                    style={{ marginBottom: '16px', marginTop: '32px' }}
                    className="btn text-white font-semibold py-3 px-6 my-8 rounded-lg shadow-md"
                >
                    {isDev() ? 'Logg inn' : 'Send kode'}
                </button>
            </form>
        </div>

    );
};

export default Login;
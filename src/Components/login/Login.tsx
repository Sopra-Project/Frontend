import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import isDev from "../../utils/DevDetect";
import { useAuthContext } from "../../hooks/useAuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [codeSent, setCodeSent] = useState(false); // New state to track if the code is sent
    const { login, sendCode } = useLogin();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void login(email);
    };

    const handleSendCode = () => {
        sendCode(code, email);
        setCodeSent(true);
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
        <div className="container p-6 bg-white max-w-md mx-auto ">
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
                {isDev() ? (
                    <button
                        type="submit"
                        style={{ marginBottom: '16px', marginTop: '16px' }}
                        className="btn text-white font-semibold py-3 px-6 mr-4 rounded-lg shadow-md"
                    >
                        Logg inn
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={handleSendCode}
                            style={{ marginBottom: '16px', marginTop: '16px' }}
                            className="btn text-white font-semibold py-3 px-6 mr-4 rounded-lg shadow-md"
                        >
                            Send kode
                        </button>
                        {codeSent && <div className="text-green-700">Kode sendt!</div>}
                    </>
                )}
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
                    {!isDev() && <button
                        type="submit"
                        style={{marginBottom: '16px', marginTop: '16px'}}
                        className="btn text-white font-semibold py-3 px-6 mr-4 rounded-lg shadow-md"
                    >
                        Logg inn
                    </button>}
                </div>
            </form>
        </div>
    );
};

export default Login;

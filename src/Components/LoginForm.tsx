import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 


function LoginForm() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    let navigate = useNavigate();

    // const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     console.log('username', username);
    //     console.log('e er', username);
    
    //     request(
    //         "POST",
    //         "auth/login",
    //         {
    //             login: username,
    //         }).then(
    //         (response) => {
    //             setAuthHeader(response.data.token);
    //             navigate('/');
    //         }).catch(
    //         (error) => {
    //             console.error('Error:', error);
    //             setError('An error occurred. Please try again later.');
    //         }
    //     );
    // };
    const getAuthToken = () => {
        return window.localStorage.getItem('auth_token');
    
    }
    
    const setAuthHeader = (token: string) => {
        window.localStorage.setItem('auth_token', token);
    }
    
 


    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        try {
            // const response = await axios.post('http://localhost:8080/api/auth/login', { username });
            const response = await axios.post('https://gjesteparkering-faa7b9adf6e4.herokuapp.com/api/auth/login', { username });

            let headers = {};
    
            if (getAuthToken() !== null && getAuthToken() !== "null") {
                headers = {"Authorization": `Bearer ${getAuthToken()}`};
            }
            
            const token = response.data.token;
            setAuthHeader(token);
            navigate('/parkingissuer'); 
        } catch (error) {
            console.log('e er', e);
            console.log('username', username);
            console.error('Error:', error);
            
            setError('Mailen eksisterer ikke. Prøv igjen.');
        }
        
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-100 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Logg inn</h2>
                <form className="flex flex-col items-center">
                    <input 
                        type="text" 
                        placeholder="Email/telefon" 
                        className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <button 
                        type="submit" 
                        className="bg-gray-400 text-white px-4 py-2 rounded-md m-2"
                        onClick={handleLogin}
                    >
                        Logg inn
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginForm;

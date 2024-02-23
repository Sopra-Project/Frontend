import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUserButton = () => {
    let navigate = useNavigate();

    const navigateToCreateUser = () => {
        navigate('/create-user');
    };

    return (
        <div className="flex justify-center">
            <button onClick={navigateToCreateUser}
                    className="w-48 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marine-blue-dark hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Opprett Ny Bruker
            </button>
        </div>
    );
};

export default CreateUserButton;


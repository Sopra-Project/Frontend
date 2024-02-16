import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate

const CreateUserButton = () => {
    let navigate = useNavigate(); // Correctly use useNavigate

    const navigateToCreateUser = () => {
        navigate('/create-user'); // Use the navigate function to change the route
    };

    return (
        <button onClick={navigateToCreateUser}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marine-blue-dark hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Opprett Ny Bruker
        </button>
    );
};

export default CreateUserButton;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteConfirmationPage = () => {
    const navigate = useNavigate();

    const handleDelete = () => {
        // Implementer logikk for sletting av brukeren her
        console.log('Bruker slettet');
        // Naviger tilbake til hovedsiden etter sletting
        navigate('/dashboard');
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Er du sikker på at du vil slette brukeren?</h2>
                <button onClick={handleDelete} className="bg-marine-blue-dark text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 mr-2">Ja</button>
                <button onClick={() => navigate('/dashboard')} className="bg-marine-blue-dark text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">Nei</button>
            </div>
        </div>
    );
};

export default DeleteConfirmationPage;

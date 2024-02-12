import React from 'react';
import { useParams } from 'react-router-dom';

function DeactivateParking() {
    const { registrationNumber } = useParams<{ registrationNumber: string }>();

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Deaktiver parkering</h2>
                <p className="mt-2 mb-2 text-center">Er du sikker på at du vil deaktivere parkering?</p>
                <p className="mt-2 mb-2">{registrationNumber}</p>
                <div className="flex justify-between">
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-md m-2" onClick={() => {}}>
                        Deaktiver
                    </button>
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-md m-2" onClick={() => {}}>
                        Lukk vindu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeactivateParking;

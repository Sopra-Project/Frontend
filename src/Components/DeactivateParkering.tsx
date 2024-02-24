import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DeactivateParking() {
    const { id } = useParams();
    const [parkingRegistrationNumber, setparkingRegistrationNumber] = useState<number | null>(null);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const response = await axios.get(`https://gjesteparkering-faa7b9adf6e4.herokuapp.com/api/parking/${id}`);
                const response = await axios.get(`http://localhost:8080/api/parking/${id}`);
                const responseRegistrationNumber = response.data.registrationNumber;
                setparkingRegistrationNumber(responseRegistrationNumber);
                console.log("Regstringsnummeret er",responseRegistrationNumber)
            } catch (error) {
                console.error("Error fetching parking spot ID:", error);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleDeactivateClick = async () => {
        try {
            if (id !== null) {
                //await axios.put(`https://gjesteparkering-faa7b9adf6e4.herokuapp.com/api/parking/${id}/free`);
                await axios.put(`http://localhost:8080/api/parking/${id}/free`);
                navigate('/');
                console.log()
            } else {
                console.error("Parking spot ID is null");
            }
        } catch (error) {
            console.error("Error deactivating parking:", error);
            
        }

    };   

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Deaktiver parking</h2>
                <p className="mt-2 mb-2 text-center">Er du sikker på at du vil deaktivere parkering?</p>
                <p className="mt-2 mb-2">{parkingRegistrationNumber}</p>
                <div className="flex justify-between">
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-md m-2" onClick={handleDeactivateClick}>
                        Deaktiver
                    </button>
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-md m-2" onClick={() => navigate('/')}>
                        Lukk vindu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeactivateParking;

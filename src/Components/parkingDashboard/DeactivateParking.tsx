// DeactivateParking.jsx
import React, {useEffect, useState} from 'react';
import ParkingService from '../../services/ParkingService';

type DeactivateParkingProps = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    handleDeactivateParking: () => void;
    handleCloseDeactivateParking: () => void;
    id?: number;
}

function DeactivateParking({showModal, handleDeactivateParking, handleCloseDeactivateParking, id}: DeactivateParkingProps) {
    const [parkingRegistrationNumber, setParkingRegistrationNumber] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await ParkingService.getParkingID(id);
                    const responseRegistrationNumber = response.registrationNumber;
                    setParkingRegistrationNumber(responseRegistrationNumber);
                    console.log("Registreringsnummeret er", responseRegistrationNumber);
                }
            } catch (error) {
                console.error("Error fetching parking spot ID:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleDeactivateClick = async () => {
        handleDeactivateParking();
    };

    const handleCloseClick = () => {
        handleCloseDeactivateParking();
    };

    return (
        <>
            {showModal && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                    <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">Deaktiver parking</h2>
                        <p className="mt-2 mb-2 text-center">Er du sikker på at du vil deaktivere parkering?</p>
                        <p className="mt-2 mb-6">Registreringsnr: <b> {parkingRegistrationNumber} </b></p>
                        <div className="flex justify-between">
                            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md m-2"
                                    onClick={handleDeactivateClick}>
                                Deaktiver
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md m-2"
                                    onClick={handleCloseClick}>
                                Lukk vindu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DeactivateParking;

import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import ParkingService from '../../services/ParkingService';

type ActivateParkingProps = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    activateParking: (registrationNumber: string, startTime: string, endTime: string) => void;
}

const ActivateParking = ({ showModal, setShowModal, activateParking }: ActivateParkingProps) => {
    const navigate = useNavigate();
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [duration, setDuration] = useState(30);


    const addMinutes = (date: Date, minutes: number): Date => {
        const newDate = new Date(date);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        return newDate;
    };


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const startTime: string = new Date().toISOString();
            const endTime: string = addMinutes(new Date(), duration).toISOString();
            activateParking(registrationNumber, startTime, endTime);
            setRegistrationNumber("");
            setDuration(30);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="flex">
            <button
    onClick={() => setShowModal(true)}
    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 m-4">
    Aktiver parkering
</button>

            </div>

            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Aktiver parking</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">Registreringsnummer</label>
                                <input
                                    type="text"
                                    id="registrationNumber"
                                    value={registrationNumber}
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                    required
                                    className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Varighet</label>
                                <select
                                    id="duration"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                                >
                                    <option value={30}>30 min</option>
                                    <option value={60}>1t</option>
                                    <option value={90}>1t 30 min</option>
                                    <option value={120}>2t</option>
                                    <option value={150}>2t 30 min</option>
                                    <option value={180}>3t</option>
                                    <option value={210}>3t 30 min</option>
                                    <option value={240}>4t</option>
                                </select>
                            </div>
                            <div className="flex justify-between">
                            <button type="submit" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md m-2">Aktiver</button>
<button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md m-2" onClick={() => setShowModal(false)}>Lukk vindu</button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActivateParking;

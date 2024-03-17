import React, {useState} from 'react';
import InspectorService from "../services/InspectorService";

const ParkingValidation = () => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleValidation = async () => {
        setError(null);
        setMessage(null);
        await InspectorService.isParkingValid(registrationNumber).then((data) => {
            if (data.valid) {
                setMessage(data.message + " with " + data.minutesLeft + " minutes left.");
            } else {
                setError("Parking is not valid");
            }
        })
    };

    return (
        <div className="container mx-auto p-6 bg-white max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">Parkering validering</h1>
            <div className="flex flex-col">
                <label className="block text-base font-medium text-gray-700">Registreringsnummer</label>
                <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Skriv inn registreringsnummer her"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                />
            </div>
            <button
                style={{ marginBottom: '16px', marginTop: '32px' }}
                className="btn text-white font-semibold py-3 px-6 rounded-lg shadow-md"
                onClick={handleValidation}
            >
                Validate Parking
            </button>
            {error && (
                <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            {message && (
                <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {message}
                </div>
            )}
        </div>

    );
};

export default ParkingValidation;

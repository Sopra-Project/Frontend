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
        <div className="container mx-auto mt-5">
            <h1 className="text-3xl font-bold">Parking Validation</h1>
            <div className="mt-4">
                <label className="block">Enter Registration Number:</label>
                <input
                    type="text"
                    className="block border border-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter registration number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                />
            </div>
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleValidation}
            >
                Validate Parking
            </button>
            {error && (
                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            {message && (
                <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {message}
                </div>
            )}
        </div>
    );
};

export default ParkingValidation;

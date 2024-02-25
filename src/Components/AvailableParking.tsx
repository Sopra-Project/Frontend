import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AvailableParkingProps {
    data: any[];
    parkedDataLength: number;
}

const AvailableParking: React.FC<AvailableParkingProps> = ({ data, parkedDataLength }) => {
    const totalParkingSpots = data.length > 0 ? data[0].user.building.totalParkingSpots : 0;
    const availableParkingSpots = totalParkingSpots - parkedDataLength

    let navigate = useNavigate();

    const handleButtonClick = () => {
        // navigate(`/activateparking`);
    };


    return (
        <div className="flex">
            <div className="bg-gray-300 p-4 w-full flex justify-between border-b border-gray-700">
                <h2 className="text-xl font-bold mb-4">Tilgjengelige parkeringer: {availableParkingSpots}</h2>
                <button className="bg-gray-400 p-3 rounded-md m-4" onClick={handleButtonClick}>Aktiver parkering</button>
            </div>
        </div>


    );
}

export default AvailableParking;
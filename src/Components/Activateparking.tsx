import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingService from '../services/ParkingService';

const ActivateParking = () => {
    let navigate = useNavigate();
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [duration, setDuration] = useState(30);

   

    const addMinutes = (date: Date, minutes: number): Date => {
        const newDate = new Date(date);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        newDate.setHours(23, 59, 59);
        return newDate;
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const startTime: string = new Date().toISOString();
            const endTime: string = addMinutes(new Date(), duration).toISOString();

            console.log('startTime', startTime);
            console.log('endTime', endTime);

            // Call activateParking function from ParkingService
            await ParkingService.activateParking(registrationNumber, startTime, endTime);

            console.log('Parking activated successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Activate Parking</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">Registration Number</label>
                        <input
                            type="text"
                            id="registrationNumber"
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                            maxLength={7}
                            required
                            className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                        <select
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                        >
                            <option value={30}>30 min</option>
                            <option value={60}>1 hour</option>
                            <option value={90}>1 hour 30 min</option>
                            <option value={120}>2 hours</option>
                            <option value={150}>2 hours 30 min</option>
                            <option value={180}>3 hours</option>
                            <option value={210}>3 hours 30 min</option>
                            <option value={240}>4 hours</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-gray-400 text-white px-4 py-2 rounded-md m-2">Activate</button>
                        <button className="bg-gray-400 text-white px-4 py-2 rounded-md m-2" onClick={() => navigate('/')}>
                            Close Window
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ActivateParking;

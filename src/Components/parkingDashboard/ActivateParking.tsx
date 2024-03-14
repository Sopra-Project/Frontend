import React, { useState, useEffect } from 'react';

type ActivateParkingProps = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    activateParking: (registrationNumber: string, startTime: string, endTime: string) => void;
}

const ActivateParking = ({ showModal, setShowModal, activateParking }: ActivateParkingProps) => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [duration, setDuration] = useState(30);
    const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10));
    const [startHour, setStartHour] = useState(new Date().getHours());
    const [startMinute, setStartMinute] = useState(new Date().getMinutes());
    const [hours, setHours] = useState<number[]>(Array.from({ length: 24 }, (_, index) => index));
    const [minutes, setMinutes] = useState<number[]>(Array.from({ length: 60 }, (_, index) => index));
    const [error, setError] = useState<string>("");

    const addMinutes = (date: Date, minutes: number): Date => {
        const newDate = new Date(date);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        return newDate;
    };

    useEffect(() => {
        const minutesOptions = Array.from({ length: 60 }, (_, index) => index);
        setMinutes(minutesOptions);
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const currentDateTime = new Date();
            const selectedDateTime = new Date(startDate);
            selectedDateTime.setHours(startHour);
            selectedDateTime.setMinutes(startMinute);

            if (selectedDateTime < currentDateTime) {
                setError("Start tid er ugyldig");
                return;
            }

            setError("");

            const startDateTime: string = `${startDate}T${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}:00.000Z`; // Combine date, hour, and minute
            const endTime: string = addMinutes(new Date(startDateTime), duration).toISOString();
            activateParking(registrationNumber, startDateTime, endTime);
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
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mt-8">
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
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Startdato</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    min={new Date().toISOString().substr(0, 10)}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                                />
                            </div>
                            <div className="flex">
                                <div className="mr-2">
                                    <label htmlFor="startHour" className="block text-sm font-medium text-gray-700">Time</label>
                                    <select
                                        id="startHour"
                                        value={startHour}
                                        onChange={(e) => setStartHour(parseInt(e.target.value))}
                                        required
                                        className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                                    >
                                        {hours.map(hour => (
                                            <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="startMinute" className="block text-sm font-medium text-gray-700">Minutt</label>
                                    <select
                                        id="startMinute"
                                        value={startMinute}
                                        onChange={(e) => setStartMinute(parseInt(e.target.value))}
                                        required
                                        className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                                    >
                                        {minutes.map(minute => (
                                            <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {error && (
                                <div className="text-red-500"> {error}</div>
                            )}
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

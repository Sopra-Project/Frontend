import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import ParkingService from '../../services/ParkingService';
import { ParkingSpot } from '../../types/types';
import { useAuthContext } from '../../hooks/useAuthContext';
import ActivateParking from './ActivateParking';
import DeactivateParking from './DeactivateParking';

function ParkingIssuer() {
    const [data, setData] = useState<ParkingSpot[]>([]);
    const [parkingMap, setParkingMap] = useState<Map<number, Map<number, ParkingSpot[]>>>(new Map());

    const today = new Date();
    const day = today.getDate();
    const [selectedDate, setSelectedDate] = useState<number>(day);
    const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());

    const [showActivateParking, setShowActivateParking] = useState(false);
    const [selectedParkingItemId, setSelectedParkingItemId] = useState<number | null>(null);
    const [showDeactivateParking, setShowDeactivateParking] = useState(false);

    const { user } = useAuthContext();

    useEffect(() => {
        if (parkingMap.size === 0 && user) {
            void fetchData();
        }
        setData(parkingMap.get(selectedMonth + 1)?.get(selectedDate) || []);
    }, [selectedDate, parkingMap, user, selectedMonth, showActivateParking]);

    const fetchData = async () => {
        await ParkingService.getAllParking().then(response => {
            Object.keys(response).forEach(key => {
                parkingMap.set(parseInt(key), new Map());
                Object.keys(response[key]).forEach(innerKey => {
                    const parkingSpots: ParkingSpot[] = response[key][innerKey];
                    parkingMap.get(parseInt(key))?.set(parseInt(innerKey), parkingSpots);
                });
            });
            setData(parkingMap.get(selectedMonth + 1)?.get(selectedDate) || []);
        });
    };

    const activateParking = async (registrationNumber: string, startTime: string, endTime: string) => {
        await ParkingService.activateParking(registrationNumber, startTime, endTime).then(response => {
            if (response.status === 200) {
                fetchData();
            }
            setShowActivateParking(false);
        });
    };

    const handleDeactivateParking = async () => {
        try {
            if (selectedParkingItemId) {
                console.log('Deactivating parking spot with ID:', selectedParkingItemId);
                await ParkingService.deactivateParking(selectedParkingItemId);
                console.log('Parking spot deactivated successfully');
                setSelectedParkingItemId(null);
                fetchData();
            }
        } catch (error) {
            console.error('Error deactivating parking:', error);
        }
    };

    const handleDeactivateClick = (id: number) => {
        setSelectedParkingItemId(id);
        setShowDeactivateParking(true);
        console.log('KUUUUUK', id);
    };

    const handleCloseDeactivateParking = () => {
        setShowDeactivateParking(false);
        setSelectedParkingItemId(null);
    };

    return (
        <>
            {data === undefined ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="flex flex-col lg:flex-row justify-between">
                        <div className="w-full lg:w-2/5 m-4 lg:m-4"> 
                            <Calendar
                                map={parkingMap}
                                setSelectedDate={setSelectedDate}
                                selectedDate={selectedDate}
                                selectedMonth={selectedMonth}
                                setSelectedMonth={setSelectedMonth}
                            />
                        </div>
                        <div className="w-full lg:w-3/5 m-4 lg:m-4">
                            {selectedParkingItemId !== null && (
                                <DeactivateParking
                                    showModal={selectedParkingItemId !== null}
                                    setShowModal={setShowDeactivateParking}
                                    handleDeactivateParking={handleDeactivateParking}
                                    handleCloseDeactivateParking={handleCloseDeactivateParking}
                                    id={selectedParkingItemId}
                                />
                            )}
                        <div className="rounded-lg bg-gray-100 rounded-lg">
                            <div className="p-6">
                                <h1 className="text-2xl font-bold mb-4">Dato: {(selectedDate).toString() + "/" + (selectedMonth + 1).toString()}</h1>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="border border-gray-300 py-2 px-4">Registreringsnr</th>
                                                <th className="border border-gray-300 py-2 px-4">Start Tid</th>
                                                <th className="border border-gray-300 py-2 px-4">Slutt Tid</th>
                                                <th className="border border-gray-300 py-2 px-4">Bruker</th>
                                                <th className="border border-gray-300 py-2 px-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {data.map((item: any, index) => (
                                            <tr key={index} className="text-gray-700">
                                                <td className="border border-gray-300 py-2 px-4">{item.registrationNumber}</td>
                                                <td className="border border-gray-300 py-2 px-4">{moment(item.startTime).format('YYYY-MM-DD HH:mm')}</td>
                                                <td className="border border-gray-300 py-2 px-4">{moment(item.endTime).format('YYYY-MM-DD HH:mm')}</td>
                                                <td className="border border-gray-300 py-2 px-4">{item.user.name} ({item.user.email})</td>
                                                <td className="border border-gray-300 py-2 px-4">
                                                    <button className="bg-red-700 hover:bg-red-800 text-white py-2 px-3 rounded-md" onClick={() => handleDeactivateClick(item.id)}>
                                                        Deaktiver
                                                    </button>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <ActivateParking
                        showModal={showActivateParking}
                        setShowModal={setShowActivateParking}
                        activateParking={activateParking}
                    />
                </>
            )}
        </>
    );
}

export default ParkingIssuer;

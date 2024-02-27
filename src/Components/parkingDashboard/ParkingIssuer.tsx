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
                <Calendar 
                    map={parkingMap} 
                    setSelectedDate={setSelectedDate} 
                    selectedDate={selectedDate} 
                    selectedMonth={selectedMonth} 
                    setSelectedMonth={setSelectedMonth} 
                />
                <ActivateParking 
                    showModal={showActivateParking} 
                    setShowModal={setShowActivateParking} 
                    activateParking={activateParking} 
                />
                {selectedParkingItemId !== null && (
                    <DeactivateParking 
                        showModal={selectedParkingItemId !== null}
                        setShowModal={setShowDeactivateParking}
                        handleDeactivateParking={handleDeactivateParking}
                        handleCloseDeactivateParking={handleCloseDeactivateParking}
                        id={selectedParkingItemId} 
                    />
                )}

                    <div className="flex">
                        <div className="bg-gray-300 p-4 w-full">
                            <h1 className="text-2xl font-bold mb-4">{(selectedDate).toString() + '/' + (selectedMonth + 1).toString()}</h1>
                            <h2 className="text-xl font-bold mb-4">Aktive parkeringer: {data.length}</h2>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-400">
                                        <th className="text-left py-2">Registreringsnr</th>
                                        <th className="text-left py-2">Fra dato/klokkelsett</th>
                                        <th className="text-left py-2">Til dato/klokkelsett</th>
                                        <th className="text-left py-2">Bruker</th>
                                        <th className="text-left py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item: any, index) => (
                                        <tr key={index} className="border-b border-gray-400">
                                            <td className="py-2">{item.registrationNumber}</td>
                                            <td className="py-2">{moment(item.startTime).format('YYYY-MM-DD HH:mm')}</td>
                                            <td className="py-2">{moment(item.endTime).format('YYYY-MM-DD HH:mm')}</td>
                                            <td className="py-2">{item.user.name} ({item.user.email})</td>
                                            <td className="py-2">
                                                <button className="bg-gray-400 p-2 rounded-md" onClick={() => handleDeactivateClick(item.id)}>
                                                    Deaktiver
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default ParkingIssuer;

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import ParkingService from '../../services/ParkingService';
import { ParkingSpot } from '../../types/types';
import { useAuthContext } from '../../hooks/useAuthContext';
import ActivateParking from './ActivateParking';
import DeactivateParking from './DeactivateParking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
    }, [selectedDate, parkingMap, user, selectedMonth, showActivateParking, showDeactivateParking]);

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
                await ParkingService.deactivateParking(selectedParkingItemId).then(response => {
                    if (response.status === 200) {
                        setShowDeactivateParking(false);
                        setParkingMap(new Map());
                    }
                });
            }
        } catch (error) {
            console.error('Error deactivating parking:', error);
        }
    };

    const handleDeactivateClick = (id: number) => {
        setSelectedParkingItemId(id);
        setShowDeactivateParking(true);
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
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        <section className="xl:col-span-1">
                            <Calendar
                                map={parkingMap}
                                setSelectedDate={setSelectedDate}
                                selectedDate={selectedDate}
                                selectedMonth={selectedMonth}
                                setSelectedMonth={setSelectedMonth}
                            />
                        </section>
                        <section className="xl:col-span-1">
                            {selectedParkingItemId !== null && (
                                <DeactivateParking
                                    showModal={showDeactivateParking}
                                    setShowModal={setShowDeactivateParking}
                                    handleDeactivateParking={handleDeactivateParking}
                                    handleCloseDeactivateParking={handleCloseDeactivateParking}
                                    id={selectedParkingItemId}
                                />
                            )}
                                <h1 className="text-2xl mb-8">Dato: {(selectedDate).toString() + "/" + (selectedMonth + 1).toString()}</h1>
                                <div className="overflow-auto rounded-lg shadow hidden sm:block">
                                    <div>
                                        <table className='Parking w-full'>
                                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                                <tr>
                                                    <th className="p-4 text-sm font-semibold tracking-wide text-left">Registreringsnr</th>
                                                    <th className="p-4 text-sm font-semibold tracking-wide text-left">Start Tid</th>
                                                    <th className="p-4 text-sm font-semibold tracking-wide text-left">Slutt Tid</th>
                                                    <th className="p-4 text-sm font-semibold tracking-wide text-left">Bruker</th>
                                                    <th className="w-4 p-4 text-sm font-semibold tracking-wide text-left"></th>
                                                </tr>
                                            </thead>
                                            <tbody className='divide-y divide-gray-100'>
                                            {data.map((item: any, index) => (
                                                <tr key={index}
                                                    className={`text-gray-700 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                                                    <td className="p-4 font-bold  text-gray-700 whitespace-nowrap"
                                                        data-label="Registreringsnr">{item.registrationNumber}</td>
                                                    <td className="p-4 text-gray-700 whitespace-nowrap"
                                                        data-label="Start Tid">{moment(item.startTime).format('HH:mm')}</td>
                                                    <td className="p-4 text-gray-700 whitespace-nowrap"
                                                        data-label="Slutt Tid">{moment(item.endTime).format('HH:mm')}</td>
                                                    <td className="p-4  text-gray-700 whitespace-nowrap"
                                                        data-label="Bruker">{item.user.name}</td>
                                                    <td className="p-4  text-gray-700 whitespace-nowrap">
                                                        <button
                                                            className="bg-red-700 hover:bg-red-800 text-white py-2 px-3 rounded-md"
                                                            onClick={() => handleDeactivateClick(item.id)}>
                                                            <FontAwesomeIcon icon={faTrash} className="mx-2"/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            <div className='flex '>
                                <div className='flex sm:hidden'>
                                    <div className='flex-wrap justify-between flex gap-8'>
                                        {data.map((item: any, index) => (
                                            <div key={index} className=" text-gray-700 text-lg bg-gray-50 rounded-lg shadow flex-grow">
                                                <div
                                                    className=" ParkingCard rounded-t-lg p-4 font-bold text-m text-gray-700 flex justify-between"
                                                    ><p className='pr-4'>Registreringsnr: </p> <p>{item.registrationNumber}</p></div>
                                                <div
                                                    className="p-4 text-lg font-medium text-gray-700 flex justify-between"
                                                    ><p>Start Tid: </p><p> {moment(item.startTime).format(' HH:mm')}</p></div>
                                                <div
                                                    className="px-4 text-lg font-medium text-gray-700 flex justify-between"
                                                    ><p>Slutt Tid: </p><p> {moment(item.endTime).format(' HH:mm')}</p>
                                                </div>
                                                <div className="p-4 text-lg font-medium text-gray-700 flex justify-between" ><p>Bruker: </p><p>{item.user.name} </p>
                                                </div>
                                                <div className="p-4 text-lg text-gray-700 flex justify-end">
                                                    <button
                                                        className="bg-red-700 hover:bg-red-800 text-white py-2 px-3 rounded-md "
                                                            onClick={() => handleDeactivateClick(item.id)}>
                                                            <FontAwesomeIcon icon={faTrash} className="mx-2" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <ActivateParking
                                    showModal={showActivateParking}
                                    setShowModal={setShowActivateParking}
                                    activateParking={activateParking}
                                    selectedDate={selectedDate}
                                />
                        </section>
                    </div>
                </>
            )}
        </>
    );
}

export default ParkingIssuer;

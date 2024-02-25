import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import moment from "moment";
import Calendar from './Calendar';
import ParkingService from '../../services/ParkingService';
import {ParkingSpot} from '../../types/types';
import {useAuthContext} from "../../hooks/useAuthContext";
import AvailableParking from '../AvailableParking';

function ParkingIssuer() {
    const [data, setData] = useState<ParkingSpot[]>([]);
    const [parkingMap, setParkingMap] = useState<Map<number, Map<number, ParkingSpot[]>>>(new Map());

    const today = new Date();
    const day = today.getDate()
    const [selectedDate, setSelectedDate] = useState<number>(day);
    const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());

    const {user} = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            if (parkingMap.size === 0 && user) {
                await ParkingService.getAllParking().then((response) => {
                    Object.keys(response).forEach((key) => {
                        parkingMap.set(parseInt(key), new Map());
                        Object.keys(response[key]).forEach((innerKey) => {
                            const parkingSpots: ParkingSpot[] = response[key][innerKey];
                            parkingMap.get(parseInt(key))?.set(parseInt(innerKey), parkingSpots);
                        })
                    });
                    setData(parkingMap.get(selectedMonth)?.get(selectedDate) || [])
                });
            }
        };
        fetchData();
        setData(parkingMap.get(selectedMonth)?.get(selectedDate) || [])
    }, [selectedDate, parkingMap, user]);


    let navigate = useNavigate();

    const handleButtonClick = (id: number) => {
        navigate(`q/${id}`);
    };

    return (
        <>
            {data === undefined ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Calendar map={parkingMap} setSelectedDate={setSelectedDate} selectedDate={selectedDate}
                              selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>


                    <AvailableParking data={data} parkedDataLength={data.length}/>

                    <div className="flex">
                        <div className="bg-gray-300 p-4 w-full">
                            <h1 className="text-2xl font-bold mb-4">{(selectedDate).toString() + "/" + (selectedMonth + 1).toString()}</h1>
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
                                        <td className="py-2">{moment(item.startTime).format("YYYY-MM-DD HH:mm")}</td>
                                        <td className="py-2">{moment(item.endTime).format("YYYY-MM-DD HH:mm")}</td>
                                        <td className="py-2">{item.user.name} ({item.user.email})</td>
                                        <td className="py-2">
                                            <button className="bg-gray-400 p-2 rounded-md"
                                                    onClick={() => handleButtonClick(item.id)}>
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
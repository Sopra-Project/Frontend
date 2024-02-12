import React, { useEffect, useState } from 'react';
import AllParkingService from '../services/AllParkingService';
import Activateparking from './Activateparking';
import { useNavigate  } from 'react-router-dom';

function Test() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const parkingData = await AllParkingService();
                setData(parkingData);
            } catch (error) {
                console.log("error", error)
            }
        };

        fetchData();
    }, []);

    const parkedData = data.filter(item => item.status.name === 'PARKED');
    let navigate = useNavigate();

    const handleButtonClick = (registrationNumber: string) => {
        navigate(`/deactivateparking/${registrationNumber}`);
    };

    return (
        <div className="flex">
            <div className="bg-gray-300 p-4 w-full">
                <h2 className="text-xl font-bold mb-4">Aktive parkeringer</h2>
                {parkedData.map((item: any, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-400">
                        <div className="grid grid-cols-5 w-full">
                            <div className="m-2"><strong>Registreringsnr:</strong> <p>{item.registrationNumber}</p></div>
                            <div className="m-2"><strong>Fra dato/klokkelsett:</strong> <p>{item.startTime}</p></div>
                            <div className="m-2"><strong>Til dato/klokkelsett:</strong> <p>{item.endTime}</p></div>
                            <div className="m-2"><strong>Bruker:</strong> <p>{item.user.name} ({item.user.email})</p></div>
                            <button className="bg-gray-400 p-2 rounded-md m-4" onClick={() => handleButtonClick(item.registrationNumber)}>
                                Deaktiver
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Test;



 /*
        <div className="flex">
            <div className="bg-gray-300 p-4 w-full">
                <h2 className="text-xl font-bold mb-4">Aktive parkeringer</h2>
                {data.map((item: any, index) => (
                    
                    <div key={index} className="a flex justify-between">
                        <div className="m-2">
                            <strong>Registration Number:</strong>
                            <p>{item.registrationNumber}</p>
                        </div>
                        <div className="m-2">
                            <strong>Start Time:</strong>
                            <p>{item.startTime}</p>
                        </div>
                        <div className="m-2">
                            <strong>End Time:</strong>
                            <p>{item.endTime}</p>
                        </div>
                        <div className="m-2">
                            <strong>User:</strong>
                            <p>{item.user.name} ({item.user.email})</p>
                        </div>
                        <div className="m-2">
                            <strong>Status:</strong>
                            <p>{item.status.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        */
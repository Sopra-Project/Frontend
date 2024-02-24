import React, {useEffect, useState} from 'react';
import AllParkingService from '../services/AllParkingService';
import {useNavigate} from 'react-router-dom';
import AvailableParking from './AvailableParkering';
import moment from "moment";

function ParkingIssuer() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await AllParkingService().then((response) => {
                    setData(response);
                })
            } catch (error) {
                console.log("error", error)
            }
        };

        fetchData();
    }, []);


    console.log("data", data)

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
                    <AvailableParking data={data} parkedDataLength={data.length} />
                    <div className="flex">
                        <div className="bg-gray-300 p-4 w-full">
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
                                            <button className="bg-gray-400 p-2 rounded-md" onClick={() => handleButtonClick(item.id)}>
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
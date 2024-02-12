import React, { useEffect, useState } from 'react';
import AllParkingService from '../services/AllParkingService';


function Test() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const parkingData = await AllParkingService();
                setData(parkingData);
            } catch (error) {
                // Handle error, e.g., show an error message to the user
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>API Data:</h1>
            <ul>
                {data.map((item: any) => (
                    <li key={item.id}>
                        <strong>Registration Number:</strong> {item.registrationNumber}<br />
                        <strong>Start Time:</strong> {item.startTime}<br />
                        <strong>End Time:</strong> {item.endTime}<br />
                        <strong>User:</strong> {item.user.name} ({item.user.email})<br />
                        <strong>Status:</strong> {item.status.name}<br />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Test;

import {useAuthContext} from "../../hooks/useAuthContext";
import {useEffect, useState} from "react";
import SuperAdminService from "../../services/SuperAdminService";
import {Building} from "../../types/types";

export const SuperAdminDashboard = () => {
    const {user} = useAuthContext()
    const [buildings, setBuildings] = useState<Building[]>([])

    useEffect(() => {
        if (user && user?.role !== 'SUPER_ADMIN') {
            window.location.href = '/';
            return;
        }
        SuperAdminService.getAllBuildings().then((response) => {
            setBuildings(response)
        })
    }, [user])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Vi har oversikt over følgende bygg</h1>
            <table className="w-full border-collapse border">
                <thead>
                <tr>
                    <th className="border p-4 text-left">Building Name</th>
                    <th className="border p-4 text-left">Total Parking Spots</th>
                    <th className="border p-4 text-left">Actions</th>

                </tr>
                </thead>
                <tbody>
                {buildings.map((building) => (
                    <tr key={building.id}>
                        <td className="border p-4">{building.name}</td>
                        <td className="border p-4">{building.totalParkingSpots}</td>
                        <td className="border p-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Edit
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>


    )

}
import React, { useEffect, useState } from 'react';
import BuildingEditButton from './BuildingEditButton';
import BuildingDeleteButton from './BuildingDeleteButton';
import AdminService from '../../services/AdminService';
import { Building } from '../../types/types';
import AddBuildingModal from './AddBuildingModal';

const BuildingManagement = () => {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [totalParkingSpots, setTotalParkingSpots] = useState('');

    useEffect(() => {
        if (buildings.length > 0) return;
        AdminService.getAllBuildings()
            .then((buildings) => {
                setBuildings(buildings);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [buildings]);

    const handleDeleteSuccess = () => {
        // Refresh building data after deletion
        setBuildings([]);
    };

    const handleCreateBuildingClick = () => setIsModalOpen(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setName('');
        setTotalParkingSpots('');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newBuilding = {
            name,
            totalParkingSpots: parseInt(totalParkingSpots),
        };

        try {
            const response = await AdminService.createBuilding(newBuilding);
            if (response.ok) {
                setBuildings([]);
                handleCloseModal();
            } else {
                throw new Error('Failed to create building');
            }
        } catch (error) {
            console.error('Error creating building:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching buildings: {error}</p>;

    return (
        <div className="overflow-x-auto shadow-xl bg-gray-100">
            <div className="hidden md:block">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead style={{ backgroundColor: '#F3F2EE' }} className="shadow-3xl">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Navn</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total parkeringsplasser</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Handlinger</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {buildings.map((building) => (
                            <tr key={building.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{building.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{building.totalParkingSpots}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <BuildingEditButton building={building} />
                                    <BuildingDeleteButton buildingId={building.id.toString()} onDeleteSuccess={handleDeleteSuccess} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handleCreateBuildingClick} className="btn text-white font-semibold border-gray-700 transition-colors duration-300 px-8 py-2 rounded-lg border-2 border-white hover:border-gray-500">
                    Legg til bygg
                </button>
            </div>
            <AddBuildingModal isOpen={isModalOpen} onClose={handleCloseModal} onBuildingAdded={() => setBuildings([])} />
        </div>
    );
};

export default BuildingManagement;







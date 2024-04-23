import React, { useState } from "react";
import AdminService from "../../services/AdminService";

interface AddBuildingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBuildingAdded: () => void;
}

const AddBuildingModal: React.FC<AddBuildingModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               onBuildingAdded,
                                                           }) => {
    const [buildingName, setBuildingName] = useState<string>("");
    const [totalParkingSpots, setTotalParkingSpots] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await AdminService.createBuilding({
                name: buildingName,
                totalparkingspots: parseInt(totalParkingSpots),
            });
            if (response.ok) {
                onBuildingAdded();
                onClose();
            }
        } catch (error) {
            console.error("Error creating building:", error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Legg til bygning</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="buildingName" className="block text-sm font-medium text-gray-700">Bygg-navn</label>
                                <input type="text" name="buildingName" required value={buildingName} onChange={(e) => setBuildingName(e.target.value)} className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="totalParkingSpots" className="block text-sm font-medium text-gray-700">Antall parkeringsplasser</label>
                                <input type="number" name="totalParkingSpots" required value={totalParkingSpots} onChange={(e) => setTotalParkingSpots(e.target.value)} className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md" />
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md m-2">Legg til</button>
                                <button type="button" onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md m-2">Lukk</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddBuildingModal;



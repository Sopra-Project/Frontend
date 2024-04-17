import React, { useState } from "react";

const BuildingManagement = () => {
    const [buildings, setBuildings] = useState([
        { id: 1, name: "Bygning A", address: "Gateveien 123", capacity: 100 },
        { id: 2, name: "Bygning B", address: "Storgata 456", capacity: 150 },
        { id: 3, name: "Bygning C", address: "Lilleveien 789", capacity: 200 }
    ]);

    const renderBuildings = () => {
        return buildings.map(building => (
            <div key={building.id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-bold mb-2">{building.name}</h2>
                <p><strong>Adresse:</strong> {building.address}</p>
                <p><strong>Kapasitet:</strong> {building.capacity}</p>
                {/* Legg til flere detaljer eller knapper etter behov */}
            </div>
        ));
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Building Management Page</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderBuildings()}
            </div>
            {/* Legg til skjema for å legge til nye bygninger, statistikk, brukeradministrasjon, osv. */}
        </div>
    );
};

export default BuildingManagement;


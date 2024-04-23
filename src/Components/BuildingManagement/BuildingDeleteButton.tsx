// BuildingDeleteButton.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface BuildingDeleteButtonProps {
    buildingId: string;
    onDeleteSuccess: () => void;
}

const BuildingDeleteButton: React.FC<BuildingDeleteButtonProps> = ({ buildingId, onDeleteSuccess }) => {
    const handleDelete = () => {
        // Handle building delete
        console.log('Deleting building with ID:', buildingId);
        onDeleteSuccess();
    };

    return (
        <button onClick={handleDelete} className="text-red-600 hover:text-red-900">
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
};

export default BuildingDeleteButton;


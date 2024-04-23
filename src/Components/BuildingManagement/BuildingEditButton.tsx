// BuildingEditButton.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Building } from '../../types/types';

export interface BuildingEditButtonProps {
    building: Building;
}

const BuildingEditButton: React.FC<BuildingEditButtonProps> = ({ building }) => {
    const handleEdit = () => {
        // Handle building edit
        console.log('Editing building:', building);
    };

    return (
        <button onClick={handleEdit} className="text-blue-600 hover:text-blue-900 mr-2">
            <FontAwesomeIcon icon={faEdit} />
        </button>
    );
};

export default BuildingEditButton;



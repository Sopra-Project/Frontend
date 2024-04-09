import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FetchHelper } from '../../utils/FetchHelper';
import { API_URL } from "../../utils/SystemVars";

interface UserDeleteButtonProps {
    userId: number;
    onDeleteSuccess: () => void;
}

const UserDeleteButton: React.FC<UserDeleteButtonProps> = ({ userId, onDeleteSuccess }) => {
    const API_BASE_URL = API_URL; // Hent rot-URL fra SystemVars.ts
    const USER_DELETE_URL = `${API_BASE_URL}/api/user/${userId}`; // Bygg slette-URL basert på rot-URL og bruker-ID

    const handleDelete = async () => {
        try {
            const response = await FetchHelper.delete(USER_DELETE_URL); // Bruk slette-URL
            if (response.ok) {
                onDeleteSuccess();
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <button onClick={handleDelete} className="text-red-600 hover:text-red-900">
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
};

export default UserDeleteButton;


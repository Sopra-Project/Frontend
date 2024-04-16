import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import UserDeleteButton from './UserDeleteButton';
import { User } from '../../types/types';
import AdminService from "../../services/AdminService";

interface UserEditButtonProps {
    user: User;
    onEditSuccess: () => void;
}

const UserEditButton: React.FC<UserEditButtonProps> = ({ user, onEditSuccess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [selectedRole, setSelectedRole] = useState(user.role.authority);

    const handleEditUserClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setName(user.name);
        setEmail(user.email);
        setSelectedRole(user.role.authority);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const roleId = selectedRole === 'admin' ? 1 : 2;
        const userData = { name, email, roleId };

        try {
            const response = await AdminService.updateUser(user.id, userData);
            if (response.ok) {
                onEditSuccess();
                handleCloseModal();
            } else {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <>
            <button onClick={handleEditUserClick} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <FontAwesomeIcon icon={faEdit} />
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">Navn:</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"/>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-medium text-gray-700 text-left">Email:</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"/>
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 text-left">Rolle:</label>
                                <select id="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none">
                                    <option value="">Velg rolle</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <button type="submit"
                                    className="btn w-full flex justify-center py-3 px-6 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                Oppdater bruker
                            </button>
                        </form>
                        <button onClick={handleCloseModal}
                                className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">
                            Lukk
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserEditButton;


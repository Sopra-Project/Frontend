import React from "react";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}


const CreateUserModal = ({isOpen, onClose}: CreateUserModalProps) => {
    if (!isOpen) return null;

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const userName = event.target.userName.value;
        const userEmail = event.target.userEmail.value;
        const userRole = event.target.userRole.value;
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Opprett Ny Bruker</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Navn</label>
                        <input type="text" name="userName" required
                               className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"/>
                    </div>
                    <div>
                        <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">E-post</label>
                        <input type="email" name="userEmail" required
                               className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"/>
                    </div>
                    <div>
                        <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">Rolle</label>
                        <select name="userRole"
                                className="mt-1 p-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
                            <option>Admin</option>
                            <option>Bruker</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button type="submit"
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md m-2">Opprett
                        </button>
                        <button type="button" onClick={onClose}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md m-2">Lukk vindu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;
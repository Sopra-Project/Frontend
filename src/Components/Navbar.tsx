import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
    const { user, dispatch } = useAuthContext();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setOpen(!open);
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        navigate("/login");
    };

    useEffect(() => {
        console.log(`isDropdownOpen: ${open}`);
    }, [open]);

    return (
        <div className="bg-marine-blue-dark py-6 px-10 flex justify-between items-center relative">
            <header className="flex items-center">
                <Link to="/" className="text-white text-3xl">{user?.building}</Link>
                {/*<h3 className="text-white ml-6">Innlogget: {user?.name}</h3>*/}
            </header>
            <nav className="hidden md:flex items-center space-x-4">
                {user && user.role === 'ADMIN' && (
                    <Link to="/" className="text-white hover:text-gray-600 font-medium transition-colors duration-300 ">Parkeringer</Link>
                )}
                {user && user.role === 'ADMIN' && (
                    <Link to="/dashboard" className="text-white hover:text-gray-600 font-medium transition-colors duration-300 px-8">Brukere</Link>
                )}
                {/* Legg til lenke til BuildingManagement */}
                {user && user.role === 'ADMIN' && (
                    <Link to="/building" className="text-white hover:text-gray-600 font-medium transition-colors duration-300 px-8">Byggadministrasjon</Link>
                )}
                {user ? (
                    <button onClick={logout} className="btn-bg-marine-blue-dark font-semibold border-gray-700 transition-colors duration-300 px-4 py-2 rounded-lg border-2 border-white hover:border-gray-500">Logg ut</button>
                ) : (
                    <Link to="/login" className="btn-bg-marine-blue-dark font-semibold border-gray-700 transition-colors duration-300 px-4 py-2 rounded-lg border-2 border-white hover:border-gray-500">Logg inn</Link>
                )}
            </nav>

            <div className="md:hidden">
                <button onClick={toggleDropdown} className="text-white hover:text-gray-600 transition-colors duration-200 focus:outline-none">
                    {open ? (
                        <FontAwesomeIcon icon={faTimes} aria-label="Close Menu" size="2x"/>
                    ) : (
                        <FontAwesomeIcon icon={faBars} aria-label="Open Menu" size="2x"/>
                    )}
                </button>
            </div>

            {open && (
                <nav className="md:hidden absolute top-full left-0 w-full bg-marine-blue-dark px-8 py-6">
                    <ul className="flex flex-col space-y-2 text-right">
                        {user && user.role === 'ADMIN' && (
                            <li className="pb-4">
                                <Link to="/" className="text-white hover:text-gray-600 transition-colors duration-300">Parkeringer</Link>
                            </li>
                        )}
                        {user && user.role === 'ADMIN' && (
                            <li className="pb-4">
                                <Link to="/dashboard" className="text-white hover:text-gray-600 transition-colors duration-300">Brukere</Link>
                            </li>
                        )}
                        {/* Legg til lenke til BuildingManagement */}
                        {user && user.role === 'ADMIN' && (
                            <li className="pb-4">
                                <Link to="/building" className="text-white hover:text-gray-600 transition-colors duration-300">Byggadministrasjon</Link>
                            </li>
                        )}
                        {user ? (
                            <li className="pb-4">
                                <button onClick={logout} className="text-white hover:text-gray-600 transition-colors duration-300">Logg ut</button>
                            </li>
                        ) : (
                            <li className="pb-4">
                                <Link to="/login" className="text-white hover:text-gray-600 transition-colors duration-300">Logg inn</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Navbar;


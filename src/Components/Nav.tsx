import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

export const Nav = () => {
    const { user, dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    useEffect(() => {

    }, [user]);

    return (
        <nav className="bg-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-white hover:text-gray-300 hover:bg-gray-700 transition-colors duration-300 px-3 py-2 rounded-lg">Hjem</Link>
                    {user && user.role === "ADMIN" && (
                        <>
                            <Link to="/dashboard" className="text-white hover:text-gray-300 hover:bg-gray-700 transition-colors duration-300 px-3 py-2 rounded-lg ml-4">Brukere</Link>
                            <Link to="/create-user" className="text-white hover:text-gray-300 hover:bg-gray-700 transition-colors duration-300 px-3 py-2 rounded-lg ml-4">Opprett ny bruker</Link>
                        </>
                    )}
                    <ul className="flex space-x-4">
                        {user ? (
                            <button onClick={logout} className="text-white hover:text-gray-300 hover:bg-gray-700 transition-colors duration-300 px-3 py-2 rounded-lg">Logg ut</button>
                        ) : (
                            <li><Link to="/login" className="text-white hover:text-gray-300 hover:bg-gray-700 transition-colors duration-300 px-3 py-2 rounded-lg">Login</Link></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

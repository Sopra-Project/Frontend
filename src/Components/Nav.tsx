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
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-white hover:text-gray-300 transition-colors duration-300">Parkeringer</Link>
                    {user && user.role === "ADMIN" && (
                        <>
                            <Link to="/dashboard" className="text-white hover:text-gray-300 transition-colors duration-300 ml-4">Brukere</Link>
                        </>
                    )}
                    <ul className="flex space-x-4">
                        {user ? (
                            <button onClick={logout} className="text-white hover:text-gray-300 transition-colors duration-300">Logg ut</button>
                        ) : (
                            <li><Link to="/login" className="text-white hover:text-gray-300 transition-colors duration-300">Login</Link></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

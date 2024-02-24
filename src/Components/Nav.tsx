import {Link} from "react-router-dom";
import {useAuthContext} from "../hooks/useAuthContext";
import {MouseEventHandler} from "react";

export const Nav = () => {
    const {user, dispatch} = useAuthContext()

    const logout = () => {
        localStorage.removeItem('token')
        dispatch({type: 'LOGOUT'})
    }

    return (
        <nav className="bg-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/dashboard" className="text-white hover:text-gray-300 ml-4">Dashboard</Link>
                    <ul className="flex space-x-4">
                        {user ? (
                            <button onClick={logout} className="text-white hover:text-gray-300">Logout</button>
                        ) : (
                            <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
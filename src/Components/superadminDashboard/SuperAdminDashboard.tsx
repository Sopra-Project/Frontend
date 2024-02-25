import {useAuthContext} from "../../hooks/useAuthContext";
import {useEffect} from "react";

export const SuperAdminDashboard = () => {
    const {user} = useAuthContext()

    useEffect(() => {
        if (user?.role !== 'SUPER_ADMIN') {
            window.location.href = '/';
        }
    }, [user])

    return (
        <div>
            <h1>SuperAdminDashboard</h1>
            <p>Current user: {user?.name}</p>
        </div>
    )

}
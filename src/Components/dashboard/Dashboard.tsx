import {useAuthContext} from "../../hooks/useAuthContext";
import UsersTable from "./UsersTable";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const Dashboard = () => {

    const {user} = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.role !== "ADMIN") {
            navigate('/')
        }
    }, [user])


    return (
        <div>
            <UsersTable/>
        </div>
    )

}

export default Dashboard;
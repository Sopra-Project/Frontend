import {useAuthContext} from "../../hooks/useAuthContext";
import UsersTable from "./UsersTable";

export const Dashboard = () => {

    const {user} = useAuthContext()

    return (
        <div>
            <UsersTable/>
        </div>
    )

}

export default Dashboard;
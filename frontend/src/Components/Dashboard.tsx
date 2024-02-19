// Components/Dashboard.tsx
import UsersTable from './UsersTable'; // Change the import
import CreateUserButton from './CreateUserButton'; // Change the import


const Dashboard = () => {
    return (
        <div>
            <UsersTable />
            <CreateUserButton />
        </div>
    );
};

export default Dashboard;

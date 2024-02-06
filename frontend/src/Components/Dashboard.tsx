// Components/Dashboard.tsx
import UsersTable from './UsersTable'; // Change the import
import CreateUserButton from './CreateUserButton'; // Change the import

const Dashboard = () => {
    return (
        <div>
            <h1>Værste gjesteparking</h1>
            <UsersTable />
            <CreateUserButton />
        </div>
    );
};

export default Dashboard;

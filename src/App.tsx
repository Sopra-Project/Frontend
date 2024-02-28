import './App.css';
import ParkingIssuer from './Components/parkingDashboard/ParkingIssuer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/login/Login';
import DeactivateParking from './Components/parkingDashboard/DeactivateParkering';
import AuthContextProvider from './contexts/AuthContext';
import Nav from './Components/Nav';
import Dashboard from './Components/dashboard/Dashboard';
import ActivateParking from './Components/parkingDashboard/Activateparking';
import {SuperAdminDashboard} from "./Components/superadminDashboard/SuperAdminDashboard";
import CreateUser from './Components/dashboard/CreateUser';
function App() {
    return (
        <Router>
            <AuthContextProvider>
                <Header/>
                <Nav/>
                <Routes>
                    <Route path="/activeparking" element={<ActivateParking/>}/>
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/" element={<ParkingIssuer/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/deactivateparking/:id" element={<DeactivateParking/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/superadmin" element={<SuperAdminDashboard/>}/>
                </Routes>
            </AuthContextProvider>
        </Router>
    );
}
    
export default App;
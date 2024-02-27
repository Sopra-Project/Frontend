import './App.css';
import ParkingIssuer from './Components/parkingDashboard/ParkingIssuer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/login/Login';
import DeactivateParking from './Components/parkingDashboard/DeactivateParking';
import AuthContextProvider from './contexts/AuthContext';
import Nav from './Components/Nav';
import Dashboard from './Components/dashboard/Dashboard';
import {SuperAdminDashboard} from "./Components/superadminDashboard/SuperAdminDashboard";

function App() {
    return (
        <Router>
            <AuthContextProvider>
                <Header/>
                <Nav/>
                <Routes>
                    <Route path="/" element={<ParkingIssuer/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/superadmin" element={<SuperAdminDashboard/>}/>
                </Routes>
            </AuthContextProvider>
        </Router>
    );
}
    
export default App;
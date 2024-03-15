import './App.css';
import ParkingIssuer from './Components/parkingDashboard/ParkingIssuer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Components/login/Login';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './Components/dashboard/Dashboard';
import {SuperAdminDashboard} from "./Components/superadminDashboard/SuperAdminDashboard";
import ParkingValidation from "./Components/ValidateParking";
import Footer from './Components/Footer';
import Navbar from "./Components/Navbar";

function App() {

    return (
        <Router>
            <AuthContextProvider>
            <Navbar/>
                <main>
                <Routes>
                    <Route path="/" element={<ParkingIssuer/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/superadmin" element={<SuperAdminDashboard/>}/>
                    <Route path="/validate" element={<ParkingValidation/>}/>
                </Routes>
                </main>
                <Footer/>
            </AuthContextProvider>
        </Router>

    );
}

export default App;
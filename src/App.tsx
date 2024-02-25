import './App.css';
import ParkingIssuer from './Components/parkingDashboard/ParkingIssuer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/login/Login';
import DeactivateParking from './Components/DeactivateParkering';
import AuthContextProvider from './contexts/AuthContext';
import Nav from './Components/Nav';
import Dashboard from './Components/dashboard/Dashboard';
import ActivateParking from './Components/ActivateParking';

function App() {
    return (
        <Router>
            <AuthContextProvider>
                <Header/>
                <Nav/>
                <Routes>
                    <Route path="/" element={<ParkingIssuer/>}/>
                    <Route path="/activateparking" element={<ActivateParking/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/deactivateparking/:id" element={<DeactivateParking/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </AuthContextProvider>
        </Router>
    );
}


export default App;

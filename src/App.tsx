import './App.css';
import ParkingIssuer from './Components/ParkingIssuer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/login/Login';
import DeactivateParking from './Components/DeactivateParkering';
import AuthContextProvider from './contexts/AuthContext';
import {useAuthContext} from './hooks/useAuthContext';

function App() {
    const {user} = useAuthContext();
    return (
        <Router>
            <AuthContextProvider>
                <Header username={user?.name}/>
                <Routes>
                    <Route path="/" element={<ParkingIssuer/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/deactivateparking/:id" element={<DeactivateParking/>}/>
                </Routes>
            </AuthContextProvider>
        </Router>
    );
}

export default App;

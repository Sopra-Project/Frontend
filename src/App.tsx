
import './App.css';
import ParkingIssuer from './Components/ParkingIssuer';

import Header from './Components/Header';
import Login from './Components/login/Login';
import DeactivateParking from './Components/DeactivateParkering';
import LoginForm from './Components/LoginForm';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ActivateParking from './Components/ActivateParking';

function App() {
  return (
    <Router>

          <LoginForm />
          
        </Router>
  );
}

export default App;

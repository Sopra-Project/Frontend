
import './App.css';
import ParkingIssuer from './Components/ParkingIssuer';

import Header from './Components/Header';
import DeactivateParking from './Components/DeactivateParkering';
import ActivateParking from './Components/ActivateParking';
import LoginForm from './Components/LoginForm';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
    <LoginForm />
  </Router>
  );
}

export default App;


import ParkingIssuer from '../Components/ParkingIssuer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from '../Components/Header';
import DeactivateParking from '../Components/DeactivateParkering';
import ActivateParking from '../Components/ActivateParking';
import LoginForm from '../Components/LoginForm';


function AuthContent() {
    return (
        <Router>
          <Header username="Brukernavn" />
          <Routes>
            <Route path="/parkingissuer" element={<ParkingIssuer />} />
            <Route path="/deactivateparking/:id" element={<DeactivateParking />} />
            <Route path="/activateparking" element={<ActivateParking />} />
          </Routes>
        </Router>
    );
  }
  
  export default AuthContent;
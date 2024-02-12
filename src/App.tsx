
import './App.css';
import ParkingIssuer from './Components/ParkeringIssuer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Activateparking from './Components/Activateparking';
import Test from './Components/ParkeringIssuer';
import DeactivateParking from './Components/DeactivateParkering';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ParkingIssuer />} />
          <Route path="/deactivateparking/:registrationNumber" element={<DeactivateParking />} />
        </Routes>
      </Router>
  );
}

export default App;


import './App.css';
import ParkingIssuer from './Components/ParkingIssuer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import DeactivateParking from './Components/DeactivateParkering';

function App() {
  return (
      <Router>
        <Header username="Brukernavn" />
        <Routes>
          <Route path="/" element={<ParkingIssuer />} />
          <Route path="/deactivateparking/:id" element={<DeactivateParking />} />
        </Routes>
      </Router>
  );
}

export default App;

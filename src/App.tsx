import React from 'react';
import logo from './logo.svg';
import './App.css';
import Parking from './Components/Parking';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Activateparking from './Components/Activateparking';
import Test from './Components/Test';

function App() {
  return (
      <Router>
        <Header />
          <Test />
        <Routes>
          <Route path="/activateparking" element={<Activateparking />}/>
          <Route path="/parkingissuer" element={<Parking />}/>
        </Routes>
          

      </Router>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Parking from './Components/Parking';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Components/Header';

function App() {
  return (
    <Router>
      <Header/>
        <Parking/>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header';
import Dashboard from "./Components/Dashboard"; // Adjust the import path

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Dashboard />
            </div>
        </Router>
    );
}

export default App;


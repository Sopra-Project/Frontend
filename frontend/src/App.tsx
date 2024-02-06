import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header'; // Adjust the import path

function App() {
    return (
        <Router>
            <div>
                <Header />
                {/* Other components and routes can be added here */}
            </div>
        </Router>
    );
}

export default App;


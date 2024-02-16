import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Header from './Components/Header';
import Dashboard from "./Components/Dashboard";
import CreateUser from "./Components/CreateUser"; // Assuming this is a new component for user creation
import EditUserForm from "./Components/EditUserForm";
function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes> {/* Use Routes instead of Switch */}
                    <Route path="/dashboard" element={<Dashboard />} /> {/* Update Route usage */}
                    <Route path="/create-user" element={<CreateUser />} /> {/* Update Route usage */}
                    <Route path="/edit-user" element={<EditUserForm />} /> {/* Ny rute for EditUserForm */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

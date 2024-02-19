// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import CreateUser from './Components/CreateUser';
import EditUserForm from './Components/EditUserForm';
import DeleteConfirmationPage from './Components/DeleteConfirmationPage';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/edit-user" element={<EditUserForm />} />
                    <Route path="/delete-confirmation" element={<DeleteConfirmationPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

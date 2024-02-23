import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import CreateUser from './Components/CreateUser';
import EditUserForm from './Components/EditUserForm';
import DeleteConfirmationPage from './Components/DeleteConfirmationPage';
import LoginPage from './Components/LoginPage';
import VerifyCodePage from './Components/VerifyCodePage'; // Importer VerifyCodePage

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
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/verify-code" element={<VerifyCodePage />} />
                    {/* Legg til rute for VerifyCodePage */}
                    {/* Omdiriger standardruten til /login */}
                    <Route path="/" element={<Navigate replace to="/login" />} />
                    {/* Fanger opp alle udefinerte ruter og omdirigerer til /login */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

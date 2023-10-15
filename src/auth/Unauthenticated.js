import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import Dashboard from '../pages/dashboard/Dashboard';
import RegisterVet from '../pages/veterinarian/RegisterVet';
import EditVet from '../pages/veterinarian/EditVet';
import RegisterOwner from '../pages/owner/RegisterOwner';
import EditOwner from '../pages/owner/EditOwner';

function Unauthenticated() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Cadastrar-Veterinario" element={<RegisterVet />} />
                <Route path="/Editar-Veterinario/:id" element={<EditVet />} />

                <Route path="/Cadastrar-Proprietario" element={<RegisterOwner />} />
                <Route path="/Editar-Proprietario/:id" element={<EditOwner />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Unauthenticated;
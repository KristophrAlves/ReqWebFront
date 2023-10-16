
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import RegisterVet from '../pages/veterinarian/RegisterVet';
import EditVet from '../pages/veterinarian/EditVet';
import RegisterOwner from '../pages/owner/RegisterOwner';
import EditOwner from '../pages/owner/EditOwner';
import RegisterAnimal from '../pages/animal/RegisterAnimal';
import EditAnimal from '../pages/animal/EditAnimal';
import RegisterExam from '../pages/exam/RegisterExam';
import EditExam from '../pages/exam/EditExam';

function Authorized() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Cadastrar-Veterinario" element={<RegisterVet />} />
                <Route path="/Editar-Veterinario/:id" element={<EditVet />} />

                <Route path="/Cadastrar-Proprietario" element={<RegisterOwner />} />
                <Route path="/Editar-Proprietario/:id" element={<EditOwner />} />

                <Route path="/Cadastrar-Animal" element={<RegisterAnimal />} />
                <Route path="/Editar-Animal/:id" element={<EditAnimal />} />

                <Route path="/Cadastrar-Exame" element={<RegisterExam />} />
                <Route path="/Editar-Exame/:id" element={<EditExam />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Authorized;
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";
import ListaVet from '../veterinarian/ListVet';
import ListOwner from '../owner/ListOwner';
import ListAnimal from '../animal/ListAnimal';
import ListExam from '../exam/ListExam';

function Dashboard() {
    const [state, setState] = useState('0');
    const userId = localStorage.getItem("UserId");
    const navigate = useNavigate();

    function Notification({ state }) {
        switch (state) {
            case '0':
                return <ListaVet userId={userId} />;
            case '1':
                return <ListOwner userId={userId} />;
            case '2':
                return <ListAnimal userId={userId} />;
            case '3':
                return <ListExam userId={userId} />;
            default:
                return null;
        }
    }

    const logout = () => {
        localStorage.removeItem("UserId");
        window.location.href = "/"
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar style={{ height: '100%', position: 'relative' }}>
                <Menu>
                    <MenuItem onClick={() => setState('0')}> Veterinários </MenuItem>
                    <MenuItem onClick={() => setState('1')}> Proprietário </MenuItem>
                    <MenuItem onClick={() => setState('2')}> Animal </MenuItem>
                    <MenuItem onClick={() => setState('3')}> Exame</MenuItem>
                </Menu>
                <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%' }}>
                    <button className="btn btn-secondary" style={{ margin: '20px' }} onClick={() => logout()}>Sair</button>
                </div>
            </Sidebar>
            <div style={{ width: '100%', padding: 10 }}>
                <Notification state={state} />
            </div>
        </div>
    );
}

export default Dashboard;

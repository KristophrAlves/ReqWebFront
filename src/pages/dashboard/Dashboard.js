import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import ListaVet from '../veterinarian/ListVet';
import ListOwner from '../owner/ListOwner';

function Dashboard() {
    const [state, setState] = useState('0');

    function Notification({ state }) {
        switch (state) {
            case '0':
                return <ListaVet />;
            case '1':
                return <ListOwner />;
            case '2':
                return <h1>2</h1>;
            case '3':
                return <h1>3</h1>;
            default:
                return null;
        }
    }

    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
            <Sidebar>
                <Menu>
                    <MenuItem onClick={() => setState('0')}> Veterinários </MenuItem>
                    <MenuItem onClick={() => setState('1')}> Proprietário </MenuItem>
                    <MenuItem onClick={() => setState('2')}> Animal </MenuItem>
                    <MenuItem onClick={() => setState('3')}> Exame</MenuItem>
                </Menu>
            </Sidebar>
            <div style={{ width: '100%', padding: 10 }}>
                <Notification state={state} /> {/* Chame a função Notification com o estado atual */}
            </div>
        </div>
    );
}

export default Dashboard;

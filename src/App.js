import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <div className="vh-100 gradient-custom"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container"
        style={{
          display: "flex",
          backgroundColor: '#2582b7',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          maxWidth: ' 900px',
          borderRadius: '20px',
        }}
      >
        <h1 className="page-header text-center">Requisições Veterinárias</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div >
  );
}

export default App;
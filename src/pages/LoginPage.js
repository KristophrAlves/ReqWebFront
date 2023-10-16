import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logInUser = () => {
        if (email.length === 0) {
            alert("Preencha os campos");
        }
        else if (password.length === 0) {
            alert("Preencha os campos");
        }
        else {
            axios.post('http://127.0.0.1:5000/login', {
                Email: email,
                Senha: password
            })
                .then(function (response) {
                    console.log(response);
                    window.location.href = "/Dashboard"
                    localStorage.setItem("UserId", response.data.UserId);
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        setError(error.response.data.message);
                    }
                });
        }
    }

    return (
        <div style={{ width: "100%" }}>
            <div className="container h-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <h1 className="row d-flex justify-content-center align-items-center h-100">Requisições Veterinarias</h1>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="Email">Email</label>
                                    <input type="email" className="form-control" id="Email" aria-describedby="Email" placeholder="Entre com seu email"
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="Password">Senha</label>
                                    <input type="password" className="form-control" id="Password" placeholder="Entre com sua senha"
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <p style={{ textAlign: "center", paddingTop: "10px" }}>
                                    <Link className="col-5 me-2 btn btn-primary" onClick={() => logInUser()}>Entrar</Link>
                                    <Link to="/register" className="col-5 btn btn-secondary">Registrar</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}
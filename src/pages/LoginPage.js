import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const logInUser = () => {
        if (email.length === 0) {
            alert("Email has left Blank!");
        }
        else if (password.length === 0) {
            alert("password has left Blank!");
        }
        else {
            axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                    navigate("/");
                })
                .catch(function (error) {
                    console.log(error, 'error');
                    if (error.response.status === 401) {
                        alert("Invalid credentials");
                    }
                });
        }
    }

    return (
        <div style={{ width: "100%" }}>
            <div className="container h-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="Email">Email</label>
                                    <input type="email" className="form-control" id="Email" aria-describedby="Email" placeholder="Entre com seu email" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="Password">Senha</label>
                                    <input type="password" className="form-control" id="Password" placeholder="Entre com sua senha" />
                                </div>
                                <p style={{ textAlign: "center", paddingTop: "10px" }}>
                                    <Link to="/login" className="col-5 me-2 btn btn-primary" onClick={() => logInUser()}>Entrar</Link>
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
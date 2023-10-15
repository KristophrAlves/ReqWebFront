import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function RegisterVet() {
    const [data, setData] = useState({
        Nome: '',
        Cpf: '',
        Crmv: '',
        UfCrmv: '',
        Email: '',
        NumeroHabilitacao: '',
        Telefone: '',
        Endereco: '',
        Cidade: '',
        Uf: '',
        UsuarioID: 1
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o envio do formulário padrão

        // Realize validações dos campos aqui
        if (data.Nome === '' || data.Cpf === '' || data.Crmv === '' || data.UfCrmv === '' || data.Email === '') {
            alert("Preencha todos os campos.");
            return;
        }

        axios.post('http://127.0.0.1:5000/cadastro_veterinario', {
            Nome: data.Nome,
            Cpf: data.Cpf,
            Crmv: data.Crmv,
            UfCrmv: data.UfCrmv,
            Email: data.Email,
            NumeroHabilitacao: data.NumeroHabilitacao,
            Telefone: data.Telefone,
            Endereco: data.Endereco,
            Cidade: data.Cidade,
            Uf: data.Uf,
            UsuarioID: 1
        })
            .then(function (response) {
                navigate("/Dashboard");
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            });
    }


    return (
        <div className="container mt-4">
            <h1>Registro de Veterinário</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="Nome">Nome</label>
                        <input type="text" className="form-control" id="Nome" placeholder="Nome"
                            value={data.Nome} onChange={(e) => setData({ ...data, Nome: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="CPF">CPF</label>
                        <input type="text" className="form-control" id="CPF" placeholder="CPF"
                            value={data.Cpf} onChange={(e) => setData({ ...data, Cpf: e.target.value })} />
                    </div>
                    <div className="col-md-2 mb-3">
                        <label htmlFor="CRMV">CRMV</label>
                        <input type="text" className="form-control" id="CRMV" placeholder="CRMV"
                            value={data.Crmv} onChange={(e) => setData({ ...data, Crmv: e.target.value })} />
                    </div>
                    <div className="col-md-1 mb-3">
                        <label htmlFor="UF">UF</label>
                        <input type="text" className="form-control" id="UF" placeholder="UF"
                            value={data.UfCrmv} onChange={(e) => setData({ ...data, UfCrmv: e.target.value })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="Email">Email</label>
                        <input type="text" className="form-control" id="Email" placeholder="Email"
                            value={data.Email} onChange={(e) => setData({ ...data, Email: e.target.value })} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="Nº de Habilitação">Nº de Habilitação</label>
                        <input type="text" className="form-control" id="Nº de Habilitação" placeholder="Nº de Habilitação"
                            value={data.NumeroHabilitacao} onChange={(e) => setData({ ...data, NumeroHabilitacao: e.target.value })} />
                    </div>
                    <div className="col-md-2 mb-3">
                        <label htmlFor="Telefone">Telefone</label>
                        <input type="text" className="form-control" id="Telefone" placeholder="Telefone"
                            value={data.Telefone} onChange={(e) => setData({ ...data, Telefone: e.target.value })} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Endereco">Endereço</label>
                    <input type="text" className="form-control" id="Endereco" placeholder="Endereço"
                        value={data.Endereco} onChange={(e) => setData({ ...data, Endereco: e.target.value })} />
                </div>

                <div className="row">
                    <div className="col-md-10 mb-3">
                        <label htmlFor="Cidade">Cidade</label>
                        <input type="Cidade" className="form-control" id="Cidade" placeholder="Cidade"
                            value={data.Cidade} onChange={(e) => setData({ ...data, Cidade: e.target.value })} />
                    </div>
                    <div className="col-md-2 mb-3">
                        <label htmlFor="UF">UF</label>
                        <input type="UF" className="form-control" id="UF" placeholder="UF"
                            value={data.Uf} onChange={(e) => setData({ ...data, Uf: e.target.value })} />
                    </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ marginRight: '0.5rem' }}>Registrar</button>
                    <Link className="btn btn-secondary" onClick={() => navigate(-1)}>Voltar</Link>
                </div>

            </form>
        </div>
    );
}

export default RegisterVet;

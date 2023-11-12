import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function RegisterOwner() {
    const [listVet, setListVet] = useState([])
    const [listAnimais, setListAnimais] = useState([])
    const userId = localStorage.getItem("UserId");
    const [data, setData] = useState({
        Serie: "",
        Numero: "",
        Metodo: "",
        Finalidade: "",
        DataExame: "",
        VeterinarioID: null,
        AnimalID: null,
        UsuarioID: userId
    });

    const opcoesMetodo = ["IDGA", "FC", "ELISA"];
    const opcoesFinalidade = ["Trânsito Nacional", "Trânsito Internacional"];

    const navigate = useNavigate();

    useEffect(() => {
        getProp();
    }, []);

    const getProp = () => {
        axios.get(`http://127.0.0.1:5000/Getveterinarios/${userId}`)
            .then(function (response) {
                setListVet(response.data);
                getAnimais();
            })
    }

    const getAnimais = () => {
        axios.get(`http://127.0.0.1:5000/Getanimais/${userId}`)
            .then(function (response) {
                setListAnimais(response.data);
            })
    }

    const handleChangeProp = (e) => {
        setData({ ...data, ProprietarioID: e.target.value });
    };

    const handleChangeAnimal = (e) => {
        setData({ ...data, AnimalID: e.target.value });
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o envio do formulário padrão

        // Realize validações dos campos aqui
        if (data.Nome === '') {
            alert("Preencha todos os campos.");
            return;
        }

        axios.post('http://127.0.0.1:5000/cadastro_exame', {
            Serie: data.Serie,
            Numero: data.Numero,
            Metodo: data.Metodo,
            Finalidade: data.Finalidade,
            DataExame: data.DataExame,
            VeterinarioID: data.VeterinarioID,
            AnimalID: data.AnimalID,
            UsuarioID: data.UsuarioID
        })
            .then(function (response) {
                navigate(-1);
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
            <h1>Registro de Exame</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="Veterinarios">Veterinários</label>
                        <select
                            className="form-control"
                            id="Veterinarios"
                            name="Veterinarios"
                            value={data.VeterinarioID}
                            onChange={handleChangeProp}
                        >
                            <option value="">Veterinários</option>
                            {listVet.map((veterinaio, index) => (
                                <option key={index} value={veterinaio.ID}>
                                    {veterinaio.Nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="Animal">Animal</label>
                        <select
                            className="form-control"
                            id="Animal"
                            name="Animal"
                            value={data.AnimalID}
                            onChange={handleChangeAnimal}
                        >
                            <option value="">Proprietário</option>
                            {listAnimais.map((animal, index) => (
                                <option key={index} value={animal.ID}>
                                    {animal.Nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="Serie">Serie</label>
                        <input type="Serie" className="form-control" id="Serie" placeholder="Serie"
                            value={data.Serie} onChange={(e) => setData({ ...data, Serie: e.target.value })} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="Numero">Numero</label>
                        <input type="Numero" className="form-control" id="Numero" placeholder="Numero"
                            value={data.Numero} onChange={(e) => setData({ ...data, Numero: e.target.value })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <label htmlFor="Metodo">Metodo</label>
                        <select
                            className="form-control"
                            id="Metodo"
                            name="Metodo"
                            value={data.Metodo}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o Metodo</option>
                            {opcoesMetodo.map((metodo, index) => (
                                <option key={index} value={metodo}>
                                    {metodo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="Finalidade">Finalidade</label>
                        <select
                            className="form-control"
                            id="Finalidade"
                            name="Finalidade"
                            value={data.Finalidade}
                            onChange={handleChange}
                        >
                            <option value="">Selecione a Finalidade</option>
                            {opcoesFinalidade.map((finalidade, index) => (
                                <option key={index} value={finalidade}>
                                    {finalidade}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="Data do Exame">Data do Exame</label>
                        <input type="date" className="form-control" id="Data do Exame" placeholder="Data do Exame"
                            value={data.DataExame} onChange={(e) => setData({ ...data, DataExame: e.target.value })} />
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

export default RegisterOwner;

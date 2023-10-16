import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

function EditOwner() {
    const [listVet, setListVet] = useState([])
    const [listAnimais, setListAnimais] = useState([])
    const [data, setData] = useState({
        Serie: "",
        Numero: "",
        Metodo: "",
        Finalidade: "",
        DataExame: "",
        VeterinarioID: null,
        AnimalID: null,
        Usuario_id: 1
    });
    const { id } = useParams(); // Obtém o ID do veterinário a ser editado
    const navigate = useNavigate();

    const opcoesMetodo = ["IDGA", "FC", "ELISA"];
    const opcoesFinalidade = ["Trânsito Nacional", "Trânsito Internacional"];

    useEffect(() => {
        // Aqui, você pode fazer uma solicitação para obter os detalhes do veterinário com o ID especificado.
        // Em seguida, atualize o estado 'data' com os detalhes obtidos.
        axios.get(`http://127.0.0.1:5000/exame/${id}`)
            .then(function (response) {
                setData(response.data);
                getProp();
            })
            .catch(function (error) {
                console.log(error, 'error');
            });
    }, [id]);


    const handleChangeVet = (e) => {
        setData({ ...data, VeterinarioID: e.target.value });
    };

    const handleChangeAnimal = (e) => {
        setData({ ...data, AnimalID: e.target.value });
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const getProp = () => {
        axios.get('http://127.0.0.1:5000/Getveterinarios/1')
            .then(function (response) {
                setListVet(response.data);
                getAnimais();
            })
    }

    const getAnimais = () => {
        axios.get('http://127.0.0.1:5000/Getanimais/1')
            .then(function (response) {
                setListAnimais(response.data);
            })
    }


    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o envio do formulário padrão

        // Realize validações dos campos aqui
        if (data.Nome === '') {
            alert("Preencha todos os campos.");
            return;
        }

        axios.put(`http://127.0.0.1:5000/exame/${id}`, data)
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
            <h1>Editar Exame</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="Veterinario">Veterinario</label>
                        <select
                            className="form-control"
                            id="Veterinario"
                            name="Veterinario"
                            value={data.VeterinarioID}
                            onChange={handleChangeVet}
                        >
                            <option value="">Veterinario</option>
                            {listVet.map((veterinario, index) => (
                                <option key={index} value={veterinario.ID}>
                                    {veterinario.Nome}
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
                    <button type="submit" className="btn btn-primary" style={{ marginRight: '0.5rem' }}>Salvar</button>
                    <Link className="btn btn-secondary" onClick={() => navigate(-1)}>Voltar</Link>
                </div>
            </form>
        </div>
    );
}

export default EditOwner;

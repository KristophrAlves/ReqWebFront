import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ListVet() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getVet();
    }, []);

    const getVet = () => {
        axios.get('http://127.0.0.1:5000/Getveterinarios/1')
            .then(function (response) {
                setData(response.data);
            })
    }

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:5000/veterinario/${id}`)
            .then(function (response) {
                console.log(response.data);
                getVet();
            })
    }

    return (
        <div className="container mt-4">
            <h1>Lista de Veterinários</h1>
            <div className="text-end mb-3">
                <Link to="/Cadastrar-Veterinario" className="btn btn-secondary">Cadastrar</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>UF</th>
                        <th className="d-flex justify-content-end">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.ID}>
                            <td>{item.Nome}</td>
                            <td>{item.Telefone}</td>
                            <td>{item.Uf}</td>
                            <td className="d-flex justify-content-end">
                                <Link to={`/Editar-Veterinario/${item.ID}`} className="btn btn-primary btn-sm">Editar</Link>
                                <button
                                    className="btn btn-danger btn-sm ms-2"
                                    onClick={() => handleDelete(item.ID)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListVet;

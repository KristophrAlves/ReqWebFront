import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ListOwner() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getProp()
    }, []);

    const getProp = () => {
        axios.get('http://127.0.0.1:5000/Getproprietarios/1')
            .then(function (response) {
                setData(response.data);
            })
    }

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:5000/proprietario/${id}`)
            .then(function (response) {
                console.log(response.data);
                getProp();
            })
    }

    return (
        <div className="container mt-4">
            <h1>Lista de Proprietário</h1>
            <div className="text-end mb-3">
                <Link to="/Cadastrar-Proprietario" className="btn btn-secondary">Cadastrar</Link>
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
                                <Link to={`/Editar-Proprietario/${item.ID}`} className="btn btn-primary btn-sm">Editar</Link>
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

export default ListOwner;

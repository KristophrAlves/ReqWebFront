import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ListVet(props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getAnimal();
    }, []);

    const getAnimal = () => {
        axios.get(`http://127.0.0.1:5000/Getanimais/${props.userId}`)
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                if (error.response.status === 404) {
                    setError(error.response.data.message);
                }
            });
    }

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:5000/animal/${id}`)
            .then(function (response) {
                // console.log(response.data);
                getAnimal();
            })
    }

    return (
        <div className="container mt-4">
            <h1>Lista de Animais</h1>
            <div className="text-end mb-3">
                <Link to="/Cadastrar-Animal" className="btn btn-secondary">Cadastrar</Link>
            </div>
            {data.length > 0 ?
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Registro nº / Marca:</th>
                            <th>Especie</th>
                            <th>Sexo</th>
                            <th className="d-flex justify-content-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.ID}>
                                <td>{item.Nome}</td>
                                <td>{item.RegistroMarca}</td>
                                <td>{item.Especie}</td>
                                <td>{item.Sexo == 'M' ? "Macho" : "Femea"}</td>
                                <td className="d-flex justify-content-end">
                                    <Link to={`/Editar-Animal/${item.ID}`} className="btn btn-primary btn-sm">Editar</Link>
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
                : error}
        </div>
    );
}

export default ListVet;

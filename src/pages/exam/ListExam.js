import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ComponentPDF from "../../components/PDF";

function ListOwner(props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [selectedExame, setSelectedExame] = useState(null);

    useEffect(() => {
        getProp()
    }, []);

    const getProp = () => {
        axios.get(`http://127.0.0.1:5000/Getexames/${props.userId}`)
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
        axios.delete(`http://127.0.0.1:5000/exame/${id}`)
            .then(function (response) {
                console.log(response.data);
                getProp();
            })
    }

    const openModal = (exame) => {
        setSelectedExame(exame);
    }

    const closeModal = () => {
        setSelectedExame(null);
    }

    return (
        <div className="container mt-4">
            <h1>Lista de Exames</h1>
            <div className="text-end mb-3">
                <Link to="/Cadastrar-exame" className="btn btn-secondary">Cadastrar</Link>
            </div>
            {data.length > 0 ?
                <table className="table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Serie</th>
                            <th>Numero</th>
                            <th>Metodo</th>
                            <th className="d-flex justify-content-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.ID}>
                                <td>{item.DataExame}</td>
                                <td>{item.Serie}</td>
                                <td>{item.Numero}</td>
                                <td>{item.Metodo}</td>
                                <td className="d-flex justify-content-end">
                                    <Link to={`/Editar-Exame/${item.ID}`} className="btn btn-primary btn-sm">Editar</Link>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => handleDelete(item.ID)}
                                    >
                                        Excluir
                                    </button>
                                    <button
                                        className="btn btn-info btn-sm ms-2"
                                        onClick={() => openModal(item)}
                                    >
                                        Ver PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : error}
            {/* Modal para exibir detalhes completos do exame */}
            {selectedExame && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalhes do Exame</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <ComponentPDF id={selectedExame.ID} />
                                {console.log(selectedExame)}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListOwner;

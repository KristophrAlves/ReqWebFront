import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

function EditVet() {
    const [listProp, setListProp] = useState([])
    const userId = localStorage.getItem("UserId");
    const [data, setData] = useState({
        ID: '',
        Nome: '',
        RegistroMarca: '',
        Especie: '',
        Raca: '',
        Sexo: '',
        Gestacao: '',
        DataNascimento: '',
        Propriedade: '',
        Classificacao: '',
        NumeroCadastroPropriedade: '',
        Coordenadas: '',
        NumeroEquideos: '',
        Cidade: '',
        Uf: '',
        Pelagem: '',
        Descricao: '',
        ProprietarioID: '',
        UsuarioID: userId
    });
    const { id } = useParams(); // Obtém o ID do veterinário a ser editado
    const navigate = useNavigate();

    const opcoesEspecies = ["Equina", "Asinina", "Muar"];
    const opcoesSexos = ["M", "F"];
    const opcoesGestacao = ["S", "N"];
    const opcoesClassificacao = ["JC", "SH", "H", "FC", "UM", "OUTRA"];

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleChangeProp = (e) => {
        setData({ ...data, ProprietarioID: e.target.value });
    };

    // useEffect(() => {
    //     getProp();
    // }, []);

    const getProp = () => {
        axios.get('http://127.0.0.1:5000/Getproprietarios/1')
            .then(function (response) {
                setListProp(response.data);
            })
    }

    useEffect(() => {
        // Aqui, você pode fazer uma solicitação para obter os detalhes do veterinário com o ID especificado.
        // Em seguida, atualize o estado 'data' com os detalhes obtidos.
        axios.get(`http://127.0.0.1:5000/animal/${id}`)
            .then(function (response) {
                setData(response.data); // Atualize 'data' com os detalhes do veterinário
                getProp();
            })
            .catch(function (error) {
                console.log(error, 'error');
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o envio do formulário padrão

        // Realize validações dos campos aqui
        if (data.Nome === '') {
            alert("Preencha todos os campos.");
            return;
        }

        axios.put(`http://127.0.0.1:5000/animal/${id}`, data)
            .then(function (response) {
                navigate("/Dashboard");
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response) {
                    alert(error);
                }
            });
    }

    return (
        <div className="container mt-4">
            <h1>Editar Animal</h1>
            <form onSubmit={handleSubmit}>
                <div className="col-md-12 mb-12">
                    <label htmlFor="Proprietario">Proprietário</label>
                    <select
                        className="form-control"
                        id="Proprietario"
                        name="Proprietario"
                        value={data.ProprietarioID}
                        onChange={handleChangeProp}
                    >
                        <option value="">Proprietário</option>
                        {listProp.map((proprietario, index) => (
                            <option key={index} value={proprietario.ID}>
                                {proprietario.Nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="row">
                    <div className="col-md-10 mb-3">
                        <label htmlFor="Nome">Nome</label>
                        <input type="Nome" className="form-control" id="Nome" placeholder="Nome"
                            value={data.Nome} onChange={(e) => setData({ ...data, Nome: e.target.value })} />
                    </div>
                    <div className="col-md-2 mb-3">
                        <label htmlFor="RegistroMarca">Registro nº / Marca</label>
                        <input type="text" className="form-control" id="RegistroMarca" placeholder="Registro nº / Marca"
                            value={data.RegistroMarca} onChange={(e) => setData({ ...data, RegistroMarca: e.target.value })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mb-2">
                        <label htmlFor="Espécie">Espécie</label>
                        <select
                            className="form-control"
                            id="Especie"
                            name="Especie"
                            value={data.Especie}
                            onChange={handleChange}
                        >
                            <option value="">Selecione a espécie</option>
                            {opcoesEspecies.map((especie, index) => (
                                <option key={index} value={especie}>
                                    {especie}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2 mb-2">
                        <label htmlFor="Raça">Raça</label>
                        <input type="text" className="form-control" id="Raça" placeholder="Raça"
                            value={data.Raca} onChange={(e) => setData({ ...data, Raca: e.target.value })} />
                    </div>
                    <div className="col-md-2 mb-2">
                        <label htmlFor="Sexo">Sexo</label>
                        <select
                            className="form-control"
                            id="Sexo"
                            name="Sexo"
                            value={data.Sexo}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o Sexo</option>
                            {opcoesSexos.map((sexo, index) => (
                                <option key={index} value={sexo}>
                                    {sexo == "M" ? "Macho" : "Femea"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2 mb-2">
                        <label htmlFor="Gestacao">Gestaçao</label>
                        <select
                            className="form-control"
                            id="Gestacao"
                            name="Gestacao"
                            value={data.Gestacao}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o Gestaçao</option>
                            {opcoesGestacao.map((gestacao, index) => (
                                <option key={index} value={gestacao}>
                                    {gestacao == "N" ? "Não" : "Sim"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 mb-2">
                        <label htmlFor="Data de Nascimento">Data de Nascimento</label>
                        <input type="date" className="form-control" id="Data de Nascimento" placeholder="Data de Nascimento"
                            value={data.DataNascimento} onChange={(e) => setData({ ...data, DataNascimento: e.target.value })} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Propriedade">Propriedade onde se encontra (endereço completo)</label>
                    <input type="text" className="form-control" id="Propriedade" placeholder=">Propriedade onde se encontra"
                        value={data.Propriedade} onChange={(e) => setData({ ...data, Propriedade: e.target.value })} />
                </div>
                <div className="row">
                    <div className="col-md-1 mb-3">
                        <label htmlFor="Classificacao">Classificação</label>
                        <select
                            className="form-control"
                            id="Classificacao"
                            name="Classificacao"
                            value={data.Classificacao}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o Gestaçao</option>
                            {opcoesClassificacao.map((classificacao, index) => (
                                <option key={index} value={classificacao}>
                                    {classificacao}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2 mb-3">
                        <label htmlFor="NumeroEquideos">Nº de equideos</label>
                        <input type="text" className="form-control" id="NumeroEquideos" placeholder="Nº de equideos"
                            value={data.NumeroEquideos} onChange={(e) => setData({ ...data, NumeroEquideos: e.target.value })} />
                    </div>
                    <div className="col-md-5 mb-3">
                        <label htmlFor="NumeroCadastroPropriedade">Nº do Cadastro da Propriedade no Orgão de Defesa Sanitária Estadual</label>
                        <input type="text" className="form-control" id="NumeroCadastroPropriedade" placeholder="Nº do Cadastro da Propriedade no Orgão de Defesa Sanitária Estadual"
                            value={data.NumeroCadastroPropriedade} onChange={(e) => setData({ ...data, NumeroCadastroPropriedade: e.target.value })} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="Coordenadas">Coordenadas Geográficas</label>
                        <input type="text" className="form-control" id="Coordenadas" placeholder="Coordenadas Geográficas"
                            value={data.Coordenadas} onChange={(e) => setData({ ...data, Coordenadas: e.target.value })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 mb-3">
                        <label htmlFor="Cidade">Cidade</label>
                        <input type="text" className="form-control" id="Cidade" placeholder="Cidade"
                            value={data.Cidade} onChange={(e) => setData({ ...data, Cidade: e.target.value })} />
                    </div>
                    <div className="col-md-2 mb-3">
                        <label htmlFor="UF">UF</label>
                        <input type="text" className="form-control" id="UF" placeholder="UF"
                            value={data.Uf} onChange={(e) => setData({ ...data, Uf: e.target.value })} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Pelagem">Pelagem</label>
                    <input type="text" className="form-control" id="Pelagem" placeholder="Pelagem"
                        value={data.Pelagem} onChange={(e) => setData({ ...data, Pelagem: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Descricao">Descrição</label>
                    <textarea
                        className="form-control"
                        id="Descricao"
                        name="Descricao" // Corrigido o atributo name
                        placeholder="Descrição"
                        value={data.Descricao}
                        onChange={handleChange} // Certifique-se de que handleChange está definido no seu componente
                    />
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ marginRight: '0.5rem' }}>Salvar</button>
                    <Link className="btn btn-secondary" onClick={() => navigate(-1)}>Voltar</Link>
                </div>

            </form>
        </div>
    );
}

export default EditVet;

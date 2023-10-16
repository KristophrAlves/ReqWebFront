import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import generatePDF from 'react-to-pdf';

const ComponentPDF = (props) => {
    const targetRef = useRef();
    const [data, setData] = useState(
        {
            Animal: {
                Cidade: "",
                Classificacao: "",
                Coordenadas: "",
                DataNascimento: "",
                Descricao: "",
                Especie: "",
                Gestacao: "",
                ID: "",
                Nome: "",
                NumeroCadastroPropriedade: "",
                NumeroEquideos: "",
                Pelagem: "",
                Propriedade: "",
                ProprietarioID: "",
                Raca: "",
                RegistroMarca: "",
                Sexo: "",
                Uf: "",
                UsuarioID: ""
            },
            Exame: {
                AnimalID: "",
                DataExame: "",
                Finalidade: "",
                ID: "",
                Metodo: "",
                Numero: "",
                Serie: "",
                UsuarioID: "",
                VeterinarioID: ""
            },
            Proprietario: {
                CNPJ: "",
                CPF: "",
                Cidade: "",
                Email: "",
                Endereco: "",
                ID: "",
                Nome: "",
                Telefone: "",
                Uf: ""
            },
            Veterinario: {
                Cidade: "",
                Cpf: "",
                Crmv: "",
                Email: "",
                Endereco: "",
                ID: "",
                Nome: "",
                NumeroHabilitacao: "",
                Telefone: "",
                Uf: "",
                UfCrmv: ""
            }
        }

    );
    const [error, setError] = useState('');

    useEffect(() => {
        getExam();
    }, [])

    const getExam = () => {
        axios.get(`http://127.0.0.1:5000/exameCompleto/${props.id}`)
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                if (error.response.status === 404) {
                    setError(error.response.data.message);
                }
            });
    }



    return (
        <div  style={{
            padding: '20px', maxWidth: "1240px", fontSize: "10px"
        }}>
            <button onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })}>Download PDF</button>
            <div ref={targetRef}>
                {/* Dados do proprietario */}
                <div className="row">
                    <div className="col-md-3">
                        <label className="small" htmlFor="metodo">Método</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="metodo" value={data.Exame.Metodo} readOnly />
                    </div>
                    <div className="col-md-3">
                        <label className="small" htmlFor="finalidade">Finalidade do Exame</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="finalidade" value={data.Exame.Finalidade} readOnly />
                    </div>
                    <div className="col-md-3">
                        <label className="small" htmlFor="serie">Série</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="serie" value={data.Exame.Serie} readOnly />
                    </div>
                    <div className="col-md-3">
                        <label className="small" htmlFor="numero">Nº</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="numero" value={data.Exame.Numero} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <label className="small" htmlFor="Proprietário">Proprietário do Animal</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="Proprietário" value={data.Proprietario.Nome} readOnly />
                    </div>
                    <div className="col-md-2">
                        <label className="small" htmlFor="cpf/cnpj">CPF/CNPJ</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="cpf/cnpj" value={data.Proprietario.CNPJ ? data.Proprietario.CNPJ : data.Proprietario.CPF} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <label className="small" htmlFor="endereco">Endereço</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="endereco" value={data.Proprietario.Endereco} readOnly />
                    </div>
                    <div className="col-md-4">
                        <label className="small" htmlFor="telefone">Telefone</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="telefone" value={data.Proprietario.Telefone} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-11">
                        <label className="small" htmlFor="cidade">Cidade</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="cidade" value={data.Proprietario.Cidade} readOnly />
                    </div>
                    <div className="col-md-1">
                        <label className="small" htmlFor="uf">UF</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="uf" value={data.Proprietario.Uf} readOnly />
                    </div>
                </div>
                {/* Dados do proprietario */}
                {/* Dados do veterinario */}
                <div className="row">
                    <div className="col-md-6">
                        <label className="small" htmlFor="veterinario">Medico Veterinário Requisitante</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="veterinario" value={data.Veterinario.Nome} readOnly />
                    </div>
                    <div className="col-md-4">
                        <label className="small" htmlFor="cpf">CPF</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="cpf" value={data.Veterinario.Cpf} readOnly />
                    </div>
                    <div className="col-md-2">
                        <label className="small" htmlFor="crmv/uf">CRMV/UF:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="crmv/uf" value={data.Veterinario.Crmv} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <label className="small" htmlFor="email">Email</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="email" value={data.Veterinario.Email} readOnly />
                    </div>
                    <div className="col-md-2">
                        <label className="small" htmlFor="numerohabilitação">Nº Habilitação</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="cpnumerohabilitaçãof" value={data.Veterinario.NumeroHabilitacao} readOnly />
                    </div>
                    <div className="col-md-5">
                        <label className="small" htmlFor="telefone">Telefone</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="telefone" value={data.Veterinario.Telefone} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label className="small" htmlFor="endereco">Endereço:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="endereco" value={data.Veterinario.Endereco} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <label className="small" htmlFor="cidade">Cidade:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="cidade" value={data.Veterinario.Cidade} readOnly />
                    </div>
                    <div className="col-md-2">
                        <label className="small" htmlFor="uf">UF:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="uf" value={data.Veterinario.Uf} readOnly />
                    </div>
                </div>
                {/* Dados do veterinario */}
                {/* Dados do animal */}
                <div className="row">
                    <div className="col-md-8">
                        <label className="small" htmlFor="nome">Nome do Animal:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="nome" value={data.Animal.Nome} readOnly />
                    </div>
                    <div className="col-md-4">
                        <label className="small" htmlFor="marca">Registro nº / Marca:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="marca" value={data.Animal.RegistroMarca} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label className="small" htmlFor="especie">Espécie:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="especie" value={data.Animal.Especie} readOnly />
                    </div>
                    <div className="col-md-3">
                        <label className="small" htmlFor="raca">Raça</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="raca" value={data.Animal.Raca} readOnly />
                    </div>
                    <div className="col-md-2">
                        <label className="small" htmlFor="sexo">Sexo</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="sexo" value={data.Animal.Sexo} readOnly />
                    </div>
                    <div className="col-md-2">
                        <label className="small" htmlFor="gestacao">Gestação</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="gestacao" value={data.Animal.Gestacao} readOnly />
                    </div>
                    <div className="col-md-2">
                        <label className="small" htmlFor="idade">Idade</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="idade" value={data.Animal.DataNascimento} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label className="small" htmlFor="endereco">Propriedade onde se encontra (endereço completo):</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="endereco" value={data.Animal.Propriedade} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="small" htmlFor="classificacao">Classificação:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="classificacao" value={data.Animal.Classificacao} readOnly />
                    </div>
                    <div className="col-md-6">
                        <label className="small" htmlFor="inscicao">Nº do Cadastro da SEAGRI:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="inscicao" value={data.Animal.NumeroCadastroPropriedade} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <label className="small" htmlFor="cordenadas">Coordenadas Geográficas:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="cordenadas" value={data.Animal.Coordenadas} readOnly />
                    </div>
                    <div className="col-md-4">
                        <label className="small" htmlFor="numeroEquideos">Nº de equideos existentes:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="numeroEquideos" value={data.Animal.NumeroEquideos} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <label className="small" htmlFor="cidade">Cidade:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="cidade" value={data.Animal.Cidade} readOnly />
                    </div>
                    <div className="col-md-2">
                        <label className="small" htmlFor="uf">UF:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="uf" value={data.Animal.Uf} readOnly />
                    </div>
                    <div className="col-md-2">
                        <label className="small" htmlFor="pelagem">Pelagem:</label>
                        <input type="text" className="form-control form-control-sm mb-1" id="pelagem" value={data.Animal.Pelagem} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <img style={{ width: "70%" }} src={require('../img/cavalo.png')} alt="Cavalo" className="img-fluid" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="small" htmlFor="Descricao">Descrição</label>
                    <textarea
                        className="form-control form-control-sm mb-1" id="pelagem" value={data.Animal.Descricao} readOnly
                    />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="small" htmlFor="dataExame">Data do Exame</label>
                            <input
                                type="date"
                                className="form-control form-control-sm mb-1"
                                id="dataExame"
                                value={data.Exame.DataExame}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-md-6" style={{ paddingTop: "34px" }}>
                        <div className="mb-3">
                            <label className="small" htmlFor="assinaturaVeterinario">Assinatura do Veterinário</label>
                            <div style={{ borderBottom: "1px solid black" }}>
                                {/* Linha de assinatura simulada */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Dados do animal */}
            </div>
        </div >
    );
}

export default ComponentPDF;
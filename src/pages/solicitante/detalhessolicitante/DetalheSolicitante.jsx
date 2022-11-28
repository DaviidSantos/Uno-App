import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import './detalhessolicitante.css'

const DetalheSolicitante = () => {
    const { cnpj } = useParams()

    const token = window.localStorage.getItem('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [solicitante, setSolicitante] = useState({
        cnpj: '',
        nomeFantasia: '',
        cep: '',
        endereco: '',
        cidade: '',
        estado: '',
        emailComercial: '',
        telefoneComercial: ''
    })

    const [solicitacoesDeAnalise, setSolicitacoesDeAnalise] = useState([])

    const loadSolicitante = async () => {
        const result = await axios.get(`http://localhost:8080/solicitante/${cnpj}`, config)
        setSolicitante(result.data)
    }

    const loadSolicitacoesDeAnalise = async () => {
        const result = await axios.get(`http://localhost:8080/solicitacao-de-analise/solicitante/${cnpj}`, config)
        setSolicitacoesDeAnalise(result.data)
    }

    useEffect(() => {
        loadSolicitante()
        loadSolicitacoesDeAnalise()
    }, [])

    return (
        <>
            <Navbar />
            <div className="detalhessolicitante__container">
                <h2>Detalhes Solicitante</h2>
                <div className="detalhessolicitante__detalhes">
                    <div className="datalhessolicitante__dados">
                        <h3>CNPJ</h3>
                        <p>{solicitante.cnpj}</p>
                    </div>
                    <div className="datalhessolicitante__dados">
                        <h3>Nome Fantasia</h3>
                        <p>{solicitante.nomeFantasia}</p>
                    </div>
                    <div className="datalhessolicitante__dados">
                        <h3>CEP</h3>
                        <p>{solicitante.cep}</p>
                    </div>
                    <div className="datalhessolicitante__dados">
                        <h3>Endereço</h3>
                        <p>{solicitante.endereco}</p>
                    </div>
                    <div className="datalhessolicitante__dados">
                        <h3>Cidade</h3>
                        <p>{solicitante.cidade}</p>
                    </div>
                    <div className="datalhessolicitante__dados">
                        <h3>Estado</h3>
                        <p>{solicitante.estado}</p>
                    </div>
                    <div className="datalhessolicitante__dados">
                        <h3>Email Comercial</h3>
                        <p>{solicitante.emailComercial}</p>
                    </div>

                    <div className="datalhessolicitante__dados">
                        <h3>Telefone Comercial</h3>
                        <p>{solicitante.telefoneComercial}</p>
                    </div>
                </div>

                <h2>Solicitações de Análise</h2>
                <div className="solicitacoesdeanalise__container-cards">
                    {
                        solicitacoesDeAnalise.map((solicitacaoDeAnalise) => (
                            <Link to={`/consultar-solicitacao-de-analise/${solicitacaoDeAnalise.idSA}`} key={solicitacaoDeAnalise.idSA} className="solicitacaodeanalise__cards">
                                <div className="card__content">
                                    <h3>{solicitacaoDeAnalise.idSA}</h3>
                                    <h2>{solicitacaoDeAnalise.solicitante.nomeFantasia}</h2>
                                    <p>{solicitacaoDeAnalise.tipoDeAnalise}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default DetalheSolicitante
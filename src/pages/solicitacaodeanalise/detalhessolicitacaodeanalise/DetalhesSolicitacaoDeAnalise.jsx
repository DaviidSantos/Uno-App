import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import './detalhessolicitacaodeanalise.css'
import download from 'downloadjs'

const DetalhesSolicitacaoDeAnalise = () => {
    const { idSA } = useParams()

    const token = window.localStorage.getItem('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [solicitacaoDeAnalise, setSolicitacoesDeAnalise] = useState({
        cnpj: '',
        tipoDeAnalise: '',
        consideracoesGerais: '',
        informacoesAdicionais: '',
        amostras: []
    })

    const [amostras, setAmostras] = useState([])

    const loadSolicitacoesDeAnalise = async () => {
        const result = await axios.get(`http://localhost:8080/solicitacao-de-analise/${idSA}`, config)
        setSolicitacoesDeAnalise(result.data)
    }

    const loadAmostras = async () => {
        const result = await axios.get(`http://localhost:8080/amostra/solicitacao-de-analise/${idSA}`, config)
        setAmostras(result.data)
    }

    useEffect(() => {
        loadSolicitacoesDeAnalise()
        loadAmostras()
    }, [])

    return (
        <>
            <Navbar />
            <div className='detalhessolicitacaodeanalise__container'>
                <h2>Detalhes Solicitação de Análise</h2>
                <div className="detalhessolicitacaodeanalise__detalhes">
                    <div className="detalhessolicitacaodeanalise__detalhes-dados">
                        <h3>Numero SA</h3>
                        <p>{solicitacaoDeAnalise.idSA}</p>
                    </div>

                    <div className="detalhessolicitacaodeanalise__detalhes-dados">
                        <h3>Solicitante</h3>
                        <p>{solicitacaoDeAnalise?.solicitante?.nomeFantasia}</p>
                    </div>

                    <div className="detalhessolicitacaodeanalise__detalhes-dados">
                        <h3>Tipo de Análise</h3>
                        <p>{solicitacaoDeAnalise.tipoDeAnalise}</p>
                    </div>
                </div>

                <h2>Amostras</h2>
                <div className="amostras__container-cards">
                    {
                        amostras.map((amostra) => (
                            <Link to={`/consultar-amostra/${amostra.idAmostra}`} className="amostras__cards">
                                <div className="card__content">
                                    <h3>{amostra.idAmostra}</h3>
                                    <h2>{amostra.nomeAmostra}</h2>
                                    <p>{amostra.tipo}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default DetalhesSolicitacaoDeAnalise
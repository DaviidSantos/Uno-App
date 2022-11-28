import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './consultarsolicitacaodeanalise.css'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'

const ConsultarSolicitacaoDeAnalise = () => {
    const token = window.localStorage.getItem('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    const [solicitacoesDeAnalise, setSolicitacoesDeAnalise] = useState([])

    const loadSolicitacoesDeAnalise = async () => {
        const result = await axios.get('http://localhost:8080/solicitacao-de-analise', config)
        setSolicitacoesDeAnalise(result.data)
    }

    useEffect(() => {
        loadSolicitacoesDeAnalise()
    }, [])

    return (
        <>
            <Navbar />
            <div className='consultarsolicitacaodeanalise__container'>
                <h2>Solicitações de Análise</h2>
                <div className="consultarsolicitacaodeanalise__container-cards">
                    {
                        solicitacoesDeAnalise.map((solicitacaoDeAnalise) => (
                            <Link to={`/consultar-solicitacao-de-analise/${solicitacaoDeAnalise.idSA}`} key={solicitacaoDeAnalise.idSA} className="consultarsolicitacaodeanalise__cards">
                                <div className="card__content">
                                    <h3>{solicitacaoDeAnalise.idSA}</h3>
                                    <h2>{solicitacaoDeAnalise?.solicitante?.nomeFantasia}</h2>
                                    <p>Detalhes</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>

            </div>
        </>
    )
}

export default ConsultarSolicitacaoDeAnalise
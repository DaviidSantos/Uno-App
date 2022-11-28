import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import './consultarsolicitantes.css'

const ConsultarSolicitantes = () => {
    const token = window.localStorage.getItem('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [solicitantes, setSolicitantes] = useState([])

    const loadSolicitantes = async () => {
        const result = await axios.get('http://localhost:8080/solicitante', config)
        setSolicitantes(result.data)
    }

    useEffect(() => {
        loadSolicitantes()
    }, [])


    return (
        <>
            <Navbar />
            <div className='consultarsolicitantes__container'>
                <h2>Solicitantes</h2>
                <div className="consultarsolicitantes__container-cards">
                    {
                        solicitantes.map((solicitante) => (
                            <Link to={`/consultar-solicitantes/${solicitante.cnpj}`} key={solicitante.cnpj} className="consultarsolicitantes__cards">
                                <div className="card__content">
                                    <h3>{solicitante.cnpj}</h3>
                                    <h2>{solicitante.nomeFantasia}</h2>
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

export default ConsultarSolicitantes
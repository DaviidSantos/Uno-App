import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import './consultaramostra.css'

const ConsultarAmostra = () => {
    const token = window.localStorage.getItem('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [amostras, setAmostras] = useState([])

    const loadAmostras = async () => {
        const result = await axios.get('http://localhost:8080/amostra', config)
        setAmostras(result.data)
    }

    useEffect(() => {
        loadAmostras()
    }, [])

    return (
        <>
            <Navbar />
            <div className='consultaramostras__container'>
                <h2>Amostras</h2>
                <div className="consultaramostras__container-cards">
                    {
                        amostras.map((amostra) => (
                            <Link to={`/consultar-amostra/${amostra.idAmostra}`} key={amostra.idAmostra} className="consultaramostra__cards">
                                <div className="card__content">
                                    <h3>{amostra.idAmostra}</h3>
                                    <h2>{amostra.nomeAmostra}</h2>
                                    <p>{amostra.solicitacaoDeAnalise.idSA}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ConsultarAmostra
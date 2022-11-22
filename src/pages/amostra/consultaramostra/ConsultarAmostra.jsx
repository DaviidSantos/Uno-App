import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './consultaramostra.css'

const ConsultarAmostra = () => {
    const [amostras, setAmostras] = useState([])

    const loadAmostras = async () => {
        const result = await axios.get('http://localhost:8080/amostra')
        setAmostras(result.data)
    }

    useEffect(() => {
        loadAmostras()
    }, [])

    return (
        <div className='consultaramostras__container'>
            <h2>Amostras</h2>
            <div className="consultaramostras__container-cards">
                {
                    amostras.map((amostra) => (
                        <Link to={`/consultar-amostra/${amostra.idAmostra}`} key={amostra.idAmostra} className="consultaramostra__cards">
                            <div className="card__content">
                                <h3>{amostra.solicitacaoDeAnalise.idSA}</h3>
                                <h2>{amostra.idAmostra}</h2>
                                <p>Detalhes</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default ConsultarAmostra
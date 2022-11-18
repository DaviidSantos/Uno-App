import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './home.css'

const Home = () => {
    const [quantidadeAmostra, setQuantidadeAmostra] = useState(
        {
            amostraFinalizada: '',
            amostraEmAnalise: '',
            amostraAguardandoAnalise: ''
        }
    )

    const carregarQuantidadeAmostras = async () => {
        const result = await axios.get('http://localhost:8080/amostra/quantidade-status')
        setQuantidadeAmostra(result.data)
    }

    useEffect(() => {
        carregarQuantidadeAmostras()
    }, [])

    return (
        <div className="home__container">
            <h2>Página Inicial</h2>
            <h3>Quantidade de amostras em cada status</h3>
            <div className="home__container-cards">
                <div className="home__cards analise_finalizada">
                    <div className="card__content">
                        <h2>Finalizadas</h2>
                        <p>{quantidadeAmostra.amostraFinalizada}</p>
                    </div>
                </div>

                <div className="home__cards em_analise">
                    <div className="card__content">
                        <h2>Em Análise</h2>
                        <p>{quantidadeAmostra.amostraEmAnalise}</p>
                    </div>
                </div>

                <div className="home__cards aguardando_analise">
                    <div className="card__content">
                        <h2>Aguardando Análise</h2>
                        <p>{quantidadeAmostra.amostraAguardandoAnalise}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
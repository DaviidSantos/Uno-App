import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './detalhesamostra.css'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const DetalhesAmostra = () => {
    const { idAmostra } = useParams()

    const [amostra, setAmostra] = useState({})
    const [ensaioSelecionado, setEnsaioSelecionado] = useState()
    const [resultadoEnsaio, setResultadoEnsaio] = useState(
        {
            resultadoDoEnsaio: ''
        }
    )
    const [cadastrarResultadoEnsaioModal, setCadastrarResultadoEnsaioModal] = useState(false)

    const loadAmostra = async () => {
        const result = await axios.get(`http://localhost:8080/amostra/${idAmostra}`)
        setAmostra(result.data)
    }

    const cadastrarResultadoEnsaio = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/ensaio/${ensaioSelecionado}`, resultadoEnsaio)
        loadAmostra()
        closeCadastrarResultadoEnsaioModal()
    }

    const resultadoEnsaioInputChange = (e) => {
        setResultadoEnsaio({...ensaioSelecionado, [e.target.name]: e.target.value})
    }

    const openCadastrarResultadoEnsaioModal = React.useCallback((id) => () => {
        setCadastrarResultadoEnsaioModal(true)
        setEnsaioSelecionado(id)
    })

    const closeCadastrarResultadoEnsaioModal = () => {
        setCadastrarResultadoEnsaioModal(false)
    }

    useEffect(() => {
        loadAmostra()
    }, [])

    const cadastrarResultadoEnsaioModalStyles = {
        content: {
            background: '#F6F6F6',
            top: '27%',
            left: '30%',
            right: '27%',
            bottom: '30%'
        }
    }

    return (
        <div className='detalhesamostra__container'>
            <h2>Detalhes da Amostra</h2>
            <div className="detalhesamostra__container-dados">
                <div className="detalhesamostra__container-dados_item">
                    <h3>Id Amostra</h3>
                    <p>{amostra.idAmostra}</p>
                </div>

                <div className="detalhesamostra__container-dados_item">
                    <h3>Nome Amostra</h3>
                    <p>{amostra.nomeAmostra}</p>
                </div>

                <div className="detalhesamostra__container-dados_item">
                    <h3>Solicitante</h3>
                    <p>{amostra.solicitacaoDeAnalise?.solicitante?.nomeSolicitante}</p>
                </div>

                <div className="detalhesamostra__container-dados_item">
                    <h3>Status Amostra</h3>
                    <p>{amostra.statusAmostra?.replace('_', ' ')}</p>
                </div>

                <div className="detalhesamostra__container-dados_item">
                    <h3>Data de Entrada</h3>
                    <p>{amostra.dataDeEntrada}</p>
                </div>

                <div className="detalhesamostra__container-dados_item">
                    <h3>Tipo de Amostra</h3>
                    <p>{amostra.tipo}</p>
                </div>

                <div className="detalhesamostra__container-dados_item">
                    <h3>Nota Fiscal</h3>
                    <p>{amostra.notaFiscal}</p>
                </div>

                <div className="detalhesamostra__container-dados_item">
                    <h3>Validade</h3>
                    <p>{amostra.validade}</p>
                </div>
            </div>

            <h2>Ensaios</h2>
            <div className="ensaios__container-cards">
                {
                    amostra?.ensaios?.map((ensaio) => {
                        if (ensaio.resultadoDoEnsaio === null) {
                            return (
                                <div className="ensaios__cards" key={ensaio.id}>
                                    <div className="card__content">
                                        <div className="card__content-top">
                                            <h3>{ensaio.id}</h3>
                                            <p onClick={openCadastrarResultadoEnsaioModal(ensaio.id)}>Resultado</p>
                                        </div>
                                        <h2>{ensaio.nomeEnsaio}</h2>
                                        <p>Especificação: {ensaio.especificacao}</p>
                                        <p>Resultado: -</p>
                                    </div>
                                </div>
                            )
                        }
                        
                        return (
                            <div className="ensaios__cards" key={ensaio.id}>
                                <div className="card__content">
                                    <div className="card__content-top">
                                        <h3>{ensaio.id}</h3>
                                        <p onClick={openCadastrarResultadoEnsaioModal(ensaio.id)}>Resultado</p>
                                    </div>
                                    <h2>{ensaio.nomeEnsaio}</h2>
                                    <p>Especificação: {ensaio.especificacao}</p>
                                    <p>Resultado: {ensaio.resultadoDoEnsaio}</p>
                                </div>
                            </div>
                        )
                        
                    })
                }
            </div>

            <Modal style={cadastrarResultadoEnsaioModalStyles} isOpen={cadastrarResultadoEnsaioModal} onRequestClose={closeCadastrarResultadoEnsaioModal}>
                <h2 className='modal-h2'>resultado </h2>
                <form onSubmit={(e) => cadastrarResultadoEnsaio(e)}>
                    <div className='resultado-input'>
                        <label htmlFor="resultadoDoEnsaio">
                            Resultado
                        </label>
                        <input type="text" tabIndex={1} className='form-control' placeholder='Informe o resultado do ensaio' name='resultadoDoEnsaio' onChange={(e) => resultadoEnsaioInputChange(e)}/>
                    </div>
                    <button className='cadastrarresultado'>Cadastrar</button>
                </form>
            </Modal>
        </div>
    )
}

export default DetalhesAmostra
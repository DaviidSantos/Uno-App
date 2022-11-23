import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './detalhesamostra.css'
import Modal from 'react-modal'
import Select from 'react-select'

Modal.setAppElement('#root')

const DetalhesAmostra = () => {
    const { idAmostra } = useParams()

    const [amostra, setAmostra] = useState({})
    const [ensaioSelecionado, setEnsaioSelecionado] = useState()
    const [resultadoEnsaio, setResultadoEnsaio] = useState()
    const [cadastrarResultadoEnsaioModal, setCadastrarResultadoEnsaioModal] = useState(false)
    const [cadastrarEnsaioModal, setCadastrarEnsaioModal] = useState(false)
    const [ensaio, setEnsaio] = useState(
        {
            idAmostra: '',
            nomeEnsaio: '',
            especificacao: ''
        }
    )

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

    const cadastrarEnsaio = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/ensaio', ensaio)
        loadAmostra()
        openCloseCadastrarEnsaioModal()
    }

    const resultadoEnsaioInputChange = (e) => {
        setResultadoEnsaio({ ...ensaioSelecionado, [e.target.name]: e.target.value })
    }
    
    const cadastroEnsaioInputChange = (e) => {
        setEnsaio({...ensaio, [e.target.name]: e.target.value})
    }

    const openCadastrarResultadoEnsaioModal = React.useCallback((id) => () => {
        setCadastrarResultadoEnsaioModal(true)
        setEnsaioSelecionado(id)
    })

    const closeCadastrarResultadoEnsaioModal = () => {
        setCadastrarResultadoEnsaioModal(false)
    }

    const openCloseCadastrarEnsaioModal = () => {
        setCadastrarEnsaioModal(!cadastrarEnsaioModal)
    }

    useEffect(() => {
        loadAmostra()
        setEnsaio({ ...ensaio, idAmostra: idAmostra })
    }, [])


    const options = [
        { value: 'Desintegração', label: 'Desintegração' },
        { value: 'Dissolução', label: 'Dissolução' },
        { value: 'pH', label: 'pH' },
        { value: 'Dureza', label: 'Dureza' },
        { value: 'Friabilidade', label: 'Friabilidade' },
        { value: 'Umidade', label: 'Umidade' },
        { value: 'Viscosidade', label: 'Viscosidade' },
        { value: 'Solubilidade', label: 'Solubilidade' },
        { value: 'Teor do Ativo', label: 'Teor Do Ativo' },
        { value: 'Teor de Impurezas', label: 'Teor de Impurezas' },
        { value: 'Particulas Visíveis', label: 'Particulas Visíveis' },
        { value: 'Peso Médio', label: 'Peso Médio' },
        { value: 'Karl Fischer', label: 'Karl Fischer' }
    ]

    const cadastrarResultadoEnsaioModalStyles = {
        content: {
            background: '#F6F6F6',
            top: '27%',
            left: '30%',
            right: '27%',
            bottom: '30%'
        }
    }

    const cadastrarEnsaioModalStyles = {
        content: {
            background: '#F6F6F6',
            top: '20%',
            left: '20%',
            right: '20%',
            bottom: '25%'
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
                        <input type="text" tabIndex={1} className='form-control' placeholder='Informe o resultado do ensaio' name='resultadoDoEnsaio' onChange={(e) => resultadoEnsaioInputChange(e)} />
                    </div>
                    <button className='cadastrarresultado'>Cadastrar</button>
                </form>
            </Modal>

            <button onClick={openCloseCadastrarEnsaioModal}>Cadastrar Ensaio</button>
            <Modal style={cadastrarEnsaioModalStyles} isOpen={cadastrarEnsaioModal} onRequestClose={openCloseCadastrarEnsaioModal}>
                <div className="cadastrarensaio__container">
                    <h2>Cadastrar Ensaio</h2>
                    <form onSubmit={(e) => cadastrarEnsaio(e)} className='cadastrarensaio__container-form'>
                        <div className="cadastrarensaio__container-form_input">
                            <label htmlFor="nomeEnsaio">Ensaio</label>
                            <Select className='select' options={options} onChange={(selecionarEnsaio) => setEnsaio({ ...ensaio, nomeEnsaio: selecionarEnsaio.value })}/>
                        </div>

                        <div className="cadastrarensaio__container-form_input">
                            <label htmlFor="especificacao">Especificação</label>
                            <input type="text" name='especificacao' onChange={(e) => cadastroEnsaioInputChange(e)}/>
                        </div>

                        <button>Cadastrar</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default DetalhesAmostra
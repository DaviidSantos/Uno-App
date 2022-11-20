import React, { useState } from 'react'
import './cadastrarsolicitacaodeanalise.css'
import Select from 'react-select'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CadastrarSolicitacaoDeAnalise = () => {
    let navigate = useNavigate()

    const [solicitacaoDeAnalise, setSolicitacaoDeAnalise] = useState({
        cnpj: '',
        tipoDeAnalise: '',
        consideracoesGerais: '',
        informacoesAdicionais: ''
    })

    const options = [
        { value: 'Desenvolvimento de Métodologia', label: 'Desenvolvimento de Métodologia' },
        { value: 'Validação de Métodologia', label: 'Validação de Métodologia' },
        { value: 'Controle de Qualidade', label: 'Controle de Qualidade' },
        { value: 'Estudo de Estabilidade', label: 'Estudo de Estabilidade' },
        { value: 'Degradação Forçada', label: 'Degradação Forçada' },
        { value: 'Perfil de Dissolução', label: 'Perfil de Dissolução' },
        { value: 'Solubilidade', label: 'Solubilidade' }
    ]

    const onInputChange = (e) => {
        setSolicitacaoDeAnalise({...solicitacaoDeAnalise, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/solicitacao-de-analise', solicitacaoDeAnalise)
        navigate('/consultar-solicitacao-de-analise')
    }

    return (
        <div className='cadastrarsolicitacaodeanalise__container'>
            <h2>Cadastrar Solicitação de Análise</h2>
            <h3>Informe abaixo os dados da Solicitação de Análise</h3>
            <form onSubmit={(e) => onSubmit(e)} className="cadastrarsolicitacaodeanalise__form">
                <div className="cadastrarsolicitacaodeanalise__form-input">
                    <label htmlFor="cnpj">CNPJ do Solicitante</label>
                    <input type="text" name='cnpj' onChange={(e) => onInputChange(e)}/>
                </div>

                <div className="cadastrarsolicitacaodeanalise__form-input">
                    <label htmlFor="tipoDeAnalise">Tipo de Análise</label>
                    <Select type="text" name='tipoDeAnalise' options={options} placeholder="Tipo de Análise" onChange={(selecionarTipoDeAnalise) => setSolicitacaoDeAnalise({...solicitacaoDeAnalise, 'tipoDeAnalise': selecionarTipoDeAnalise.value})}/>
                </div>

                <div className="cadastrarsolicitacaodeanalise__form-input">
                    <label htmlFor="consideracoesGerais">Considerações Gerais</label>
                    <textarea name="consideracoesGerais" id="" cols="70" rows="10" onChange={(e) => onInputChange(e)}/>
                </div>

                <div className="cadastrarsolicitacaodeanalise__form-input">
                    <label htmlFor="informacoesAdicionais">Informações Adicionais</label>
                    <textarea name="informacoesAdicionais" id="" cols="70" rows="10" onChange={(e) => onInputChange(e)}/>
                </div>

                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default CadastrarSolicitacaoDeAnalise
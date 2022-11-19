import axios from 'axios'
import React, { useState } from 'react'
import './cadastrarsolicitante.css'
import { useNavigate } from 'react-router-dom'

const CadastrarSolicitante = () => {
    let navigate = useNavigate()

    const [solicitante, setSolicitante] = useState({
        cnpj: '',
        nomeSolicitante: '',
        cep: '',
        endereco: '',
        cidade: '',
        estado: '',
        emailComercial: '',
        telefoneComercial: ''
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/solicitante', solicitante)
        navigate('/consultar-solicitantes')
    }

    const onInputChange = (e) => {
        setSolicitante({ ...solicitante, [e.target.name]: e.target.value })
    }

    return (
        <div className='cadastrarsolicitante__container'>
            <h2>Cadastrar Solicitante</h2>
            <h3>Informe abaixo os dados do solicitante que será cadastrado</h3>
            <form onSubmit={(e) => onSubmit(e)} className="cadastrarsolicitante__form">
                <div className="cadastrarsolicitante__form-input">
                    <label htmlFor="cnpj">
                        CNPJ
                    </label>
                    <input className='left' type="text" placeholder='Informe o cnpj do solicitante' name='cnpj' onChange={(e) => onInputChange(e)} required />
                </div>

                <div className="cadastrarsolicitante__form-input">
                    <label className='right' htmlFor="nomeSolicitante">
                        Nome Fantasia
                    </label>
                    <input className='right' type="text" placeholder='Informe o nome fantasia do solicitante' name='nomeSolicitante' onChange={(e) => onInputChange(e)} required />
                </div>

                <div className="cadastrarsolicitante__form-input">
                    <label htmlFor="cep">
                        CEP
                    </label>
                    <input className='left' type="text" placeholder='Informe o cep do solicitante' name='cep' onChange={(e) => onInputChange(e)} required />
                </div>

                <div className="cadastrarsolicitante__form-input">
                    <label className='right' htmlFor="endereco">
                        Endereço
                    </label>
                    <input className='right' type="text" placeholder='Informe o endereço do solicitante' name='endereco' onChange={(e) => onInputChange(e)} required />
                </div>

                <div className="cadastrarsolicitante__form-input">
                    <label htmlFor="cidade">
                        Cidade
                    </label>
                    <input className='left' type="text" placeholder='Informe a cidade do solicitante' name='cidade' onChange={(e) => onInputChange(e)} required />
                </div>

                <div className="cadastrarsolicitante__form-input">
                    <label className='right' htmlFor="estado">
                        Estado
                    </label>
                    <input className='right' type="text" placeholder='Informe o estado do solicitante' name='estado' onChange={(e) => onInputChange(e)} required />
                </div>

                <div className="cadastrarsolicitante__form-input">
                    <label htmlFor="emailComercial">
                        Email Comercial
                    </label>
                    <input className='left' type="text" placeholder='Informe o email comercial do solicitante' name='emailComercial' onChange={(e) => onInputChange(e)} required />
                </div>

                <div className="cadastrarsolicitante__form-input">
                    <label className='right' htmlFor="telefoneComercial">
                        Telefone Comercial
                    </label>
                    <input className='right' type="text" placeholder='Informe o cnpj do solicitante' name='telefoneComercial' onChange={(e) => onInputChange(e)} required />
                </div>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default CadastrarSolicitante
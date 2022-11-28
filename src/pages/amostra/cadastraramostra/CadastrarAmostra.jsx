import axios from 'axios'
import Navbar from '../../../components/navbar/Navbar'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './cadastraramostra.css'

const CadastrarAmostra = () => {
  const token = window.localStorage.getItem('token');

  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  let navigate = useNavigate()

  const [amostra, setAmostra] = useState({
    solicitacaoDeAnalise: '',
    nomeAmostra: '',
    tipo: '',
    notaFiscal: '',
    validade: ''
  })

  const onInputChange = (e) => {
    setAmostra({ ...amostra, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8080/amostra', amostra, config)
    navigate('/consultar-amostra')
  }

  return (
    <>
      <Navbar />
      <div className='cadastraramostra__container'>
        <h2>Cadastrar Amostra</h2>
        <h3>Informe abaixo os dados da amostra</h3>
        <form onSubmit={(e) => onSubmit(e)} className="cadastraramostra__container-form">
          <div className="cadastraramostra__form">
            <div className="cadastraramostra__form-input">
              <label htmlFor="solicitacaoDeAnalise">Solicitação de Análise</label>
              <input type="text" name='solicitacaoDeAnalise' onChange={(e) => onInputChange(e)} />
            </div>

            <div className="cadastraramostra__form-input">
              <label htmlFor="nomeAmostra">Nome da Amostra</label>
              <input type="text" name='nomeAmostra' onChange={(e) => onInputChange(e)} />
            </div>

            <div className="cadastraramostra__form-input">
              <label htmlFor="notaFiscal">Nota Fiscal</label>
              <input type="text" name='notaFiscal' onChange={(e) => onInputChange(e)} />
            </div>

            <div className="cadastraramostra__form-input">
              <label htmlFor="tipo">Tipo de Amostra</label>
              <input type="text" name='tipo' onChange={(e) => onInputChange(e)} />
            </div>

            <div className="cadastraramostra__form-input">
              <label htmlFor="validade">Validade</label>
              <input type="date" name='validade' onChange={(e) => onInputChange(e)} />
            </div>
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  )
}

export default CadastrarAmostra
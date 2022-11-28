import React, {useState, useRef, useEffect} from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Select from 'react-select'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CadastrarUsuario = () => {
    let navigate = useNavigate()
    const token = window.localStorage.getItem('token');
    const errRef = useRef()

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [errMsg, setErrMsg] = useState('')


    const [usuario, setUsuario] = useState({
        nome: '',
        cargo: '',
        email: '',
        senha: ''
    })

    const options = [
        { value: 1, label: 'Administrador' },
        { value: 2, label: 'Análista' },
        { value: 3, label: 'Vendedor' },
        { value: 4, label: 'Expedição' },
    ]

    const onInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/usuario', usuario, config)
        navigate('/')
    }

    useEffect(() => {
        setErrMsg('')
      })

  return (
    <>
            <Navbar />
            <div className='cadastrarsolicitacaodeanalise__container'>
                <h2>Cadastrar Usuário</h2>
                <h3>Informe abaixo os dados do usuário</h3>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form onSubmit={(e) => onSubmit(e)} className="cadastrarsolicitacaodeanalise__form">
                    <div className="cadastrarsolicitacaodeanalise__form-input">
                        <label htmlFor="cnpj">Nome</label>
                        <input type="text" name='cnpj' onChange={(e) => onInputChange(e)} />
                    </div>

                    <div className="cadastrarsolicitacaodeanalise__form-input">
                        <label htmlFor="tipoDeAnalise">Cargo</label>
                        <Select type="text" name='tipoDeAnalise' options={options} placeholder="Cargo" onChange={(cargo) => setUsuario({ ...usuario, 'cargo': cargo.value })} />
                    </div>

                    <div className="cadastrarsolicitacaodeanalise__form-input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' onChange={(e) => onInputChange(e)}/>
                    </div>

                    <div className="cadastrarsolicitacaodeanalise__form-input">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" name="senha" onChange={(e) => onInputChange(e)} />
                    </div>

                    <button type='submit'>Cadastrar</button>
                </form>
            </div>
        </>
  )
}

export default CadastrarUsuario
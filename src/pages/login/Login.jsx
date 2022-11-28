import React, { useContext } from 'react'
import Logo from '../../assets/Logo.svg'
import useAuth from '../../hooks/useAuth'
import './login.css'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate, useLocation} from 'react-router-dom'

const Login = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const userRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef?.current?.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, senha])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/token', {},
      {
        auth: {
          username: email,
          password: senha
        }
      })

      const token = response?.data;
      const roles = response?.data?.authorities;
      console.log(response.data)
      setAuth({email, senha, roles, token})
      window.localStorage.setItem('token', token);
      setEmail('')
      setSenha('')
      navigate(from, {replace: true})
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
    } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
    } else {
        setErrMsg('Login Failed');
    }
    errRef.current.focus();
    }

  }

  return (
    <div className='login__container'>
      <div className="login__container-bg" >
      </div>
      <div className="login__container-form">
        <div className="login__container-form_main">
          <img src={Logo} alt="logo" />
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Bem vindo(a) de volta!</h1>
          <p>Por favor, informe suas credenciais.</p>
          <form className='login__form' onSubmit={(e) => handleSubmit(e)}>
            <div className="login__form-dados">
              <label htmlFor="email">Email</label>
              <input type="text" id='email' placeholder='Informe seu email' ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} required />
            </div>

            <div className="login__form-dados">
              <label htmlFor="senha">Senha</label>
              <input type="password" id='senha' placeholder='Informe sua senha' autoComplete='off' onChange={(e) => setSenha(e.target.value)} value={senha} required />
            </div>

            <button>Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
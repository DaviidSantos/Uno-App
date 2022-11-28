import './App.css'
import Home from './pages/home/Home'
import CadastrarSolicitante from './pages/solicitante/cadastrarsolicitante/CadastrarSolicitante'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import ConsultarSolicitantes from './pages/solicitante/consultarsolicitantes/ConsultarSolicitantes'
import DetalheSolicitante from './pages/solicitante/detalhessolicitante/DetalheSolicitante'
import CadastrarSolicitacaoDeAnalise from './pages/solicitacaodeanalise/cadastrarsolicitacaoeanalise/CadastrarSolicitacaoDeAnalise'
import ConsultarSolicitacaoDeAnalise from './pages/solicitacaodeanalise/consultarsolicitacaodeanalise/ConsultarSolicitacaoDeAnalise'
import DetalhesSolicitacaoDeAnalise from './pages/solicitacaodeanalise/detalhessolicitacaodeanalise/DetalhesSolicitacaoDeAnalise'
import CadastrarAmostra from './pages/amostra/cadastraramostra/CadastrarAmostra'
import ConsultarAmostra from './pages/amostra/consultaramostra/ConsultarAmostra'
import DetalhesAmostra from './pages/amostra/detalhesamostra/DetalhesAmostra'
import Login from './pages/login/Login'
import Layout from './components/layout/Layout'
import RequireAuth from './components/requireauth/RequireAuth'
import { AuthProvider } from './context/AuthProvider'
import CadastrarUsuario from './pages/usuario/cadastrarusuario/CadastrarUsuario'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route exact path='login' element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route exact path='/' element={<Home />} />
              <Route exact path='cadastrar-solicitante' element={<CadastrarSolicitante />} />
              <Route exact path='consultar-solicitantes' element={<ConsultarSolicitantes />} />
              <Route exact path='consultar-solicitantes/:cnpj' element={<DetalheSolicitante />} />
              <Route exact path='cadastrar-solicitacao-de-analise' element={<CadastrarSolicitacaoDeAnalise />} />
              <Route exact path='consultar-solicitacao-de-analise' element={<ConsultarSolicitacaoDeAnalise />} />
              <Route exact path='consultar-solicitacao-de-analise/:idSA' element={<DetalhesSolicitacaoDeAnalise />} />
              <Route exact path='cadastrar-amostra' element={<CadastrarAmostra />} />
              <Route exact path='consultar-amostra' element={<ConsultarAmostra />} />
              <Route exact path='consultar-amostra/:idAmostra' element={<DetalhesAmostra />} />
              <Route exact path='cadastrar-usuario' element={<CadastrarUsuario/>}/>
            </Route>

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

import './App.css'
import Navbar from './components/navbar/Navbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import CadastrarSolicitante from './pages/solicitante/cadastrarsolicitante/CadastrarSolicitante'
import ConsultarSolicitantes from './pages/solicitante/consultarsolicitantes/ConsultarSolicitantes'
import DetalheSolicitante from './pages/solicitante/detalhessolicitante/DetalheSolicitante'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/cadastrar-solicitante' element={<CadastrarSolicitante/>}/>
          <Route exact path='/consultar-solicitantes' element={<ConsultarSolicitantes/>}/>
          <Route exact path='/consultar-solicitantes/:cnpj' element={<DetalheSolicitante/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

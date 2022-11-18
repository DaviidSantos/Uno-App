import './App.css'
import Navbar from './components/navbar/Navbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import CadastrarSolicitante from './pages/solicitante/cadastrarsolicitante/CadastrarSolicitante'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/cadastrar-solicitante' element={<CadastrarSolicitante/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

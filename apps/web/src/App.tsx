import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Triagem from './pages/Triagem'
import FichaPaciente from './pages/FichaPaciente'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/triagem" element={<Triagem />} />
        <Route path="/ficha-paciente" element={<FichaPaciente />} />
      </Routes>
    </Router>
  )
}

export default App


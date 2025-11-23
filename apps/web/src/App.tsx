import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Triagem from './pages/Triagem'
import FichaPaciente from './pages/FichaPaciente'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/triagem"
          element={
            <ProtectedRoute>
              <Triagem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ficha-paciente"
          element={
            <ProtectedRoute>
              <FichaPaciente />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App


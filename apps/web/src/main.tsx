import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { TriageProvider } from './contexts/TriageContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TriageProvider>
      <App />
    </TriageProvider>
  </React.StrictMode>,
)


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { applyTheme, getTheme } from './utils/themes'
import App from './App'
import './index.css'

// Initialize theme before rendering
const savedTheme = getTheme()
applyTheme(savedTheme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

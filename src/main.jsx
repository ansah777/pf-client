import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Contextapis from './Context_Api/Contextapis.jsx'
import AuthContext from './Context_Api/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContext>
    <Contextapis>
    <App />
    </Contextapis>
    </AuthContext>
    </BrowserRouter>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Falls diese Zeile einen Fehler macht, lösche sie einfach, 
// aber meistens ist sie da:
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
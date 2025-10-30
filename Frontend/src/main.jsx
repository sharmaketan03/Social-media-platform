import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Components/Login.jsx'
import ReactRouter from './Components/React-router.jsx'

createRoot(document.getElementById('root')).render(

    <ReactRouter/>

)

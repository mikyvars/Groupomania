import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header'
import Home from './pages/Home'
import './style.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Header />
        <Home />
    </React.StrictMode>
)

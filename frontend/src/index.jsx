import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getUserData } from './services/Authentification'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './custom.scss'

import Header from './components/Header'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Auth from './components/Auth'
axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.headers = { Authorization: `Bearer ${getUserData().token}` }
axios.defaults.params = { userId: getUserData().userId }

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Auth Component={Home} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

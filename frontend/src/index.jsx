import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import AuthLayout from './services/AuthLayout'
import axios from 'axios'
import './custom.scss'

import Header from './components/Header'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import * as User from './services/User'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.interceptors.request.use(
    function (config) {
        config.headers = { Authorization: `Bearer ${User.userData().token}` }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

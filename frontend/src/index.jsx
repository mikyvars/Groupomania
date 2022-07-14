import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './custom.scss'

import Header from './components/Header'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Auth from './components/Auth'
axios.defaults.baseURL = process.env.REACT_APP_API_URL

const StyledApp = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        height: 100vh;
        font-family: Roboto;
    }

    p {
        margin: 0;
    }
`

function App() {
    return (
        <BrowserRouter>
            <StyledApp />
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

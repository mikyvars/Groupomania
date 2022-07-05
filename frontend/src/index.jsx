import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import Header from './components/Header'
import Home from './pages/Home'
import Signup from './pages/Auth/signup'
import Login from './pages/Auth/login'

const StyledApp = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: Roboto;
    }

    p {
        margin: 0;
    }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <StyledApp />
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
)

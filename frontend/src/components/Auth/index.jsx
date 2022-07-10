import React from 'react'
import { Navigate } from 'react-router-dom'
import { isExpired } from 'react-jwt'

const Auth = ({ Component }) => {
    const { token } = JSON.parse(localStorage.getItem('auth')) || ''
    return isExpired(token) ? <Navigate to="/login" /> : <Component />
}

export default Auth

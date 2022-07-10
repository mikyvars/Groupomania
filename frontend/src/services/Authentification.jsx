import { isExpired } from 'react-jwt'

export function isAuthenticated() {
    const { token } = JSON.parse(localStorage.getItem('user')) || ''
    return !isExpired(token)
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('user'))
}

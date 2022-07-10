import { isExpired } from 'react-jwt'

export function isAuthenticated() {
    const { token } = JSON.parse(localStorage.getItem('auth')) || ''
    return !isExpired(token)
}

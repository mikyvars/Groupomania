import axios from 'axios'
import { isExpired } from 'react-jwt'

export const isAuthenticated = () => {
    const { token } = getUserData()
    return token != null && !isExpired(token)
}

export function login(data) {
    axios
        .post('/auth/login', data)
        .then((response) => {
            window.localStorage.setItem(
                'user',
                JSON.stringify({
                    token: response.data.token,
                    userId: response.data.userId,
                    grade: response.data.grade,
                })
            )
        })
        .catch((error) => {
            return [false, error.response.status]
        })
}

export function signup(data) {
    axios
        .post('/auth/signup', data)
        .then((response) => {
            return [true, null]
        })
        .catch((error) => {
            return [false, error.response.status]
        })
}

export function logout() {
    window.localStorage.removeItem('user')
    return window.localStorage.getItem('user') == null
}

export function getUserData() {
    if (localStorage.getItem('user') == null) {
        return false
    }

    const userParsed = JSON.parse(localStorage.getItem('user'))
    const { token, userId } = userParsed

    if ((token || userId) == null) {
        return false
    }

    return userParsed
}

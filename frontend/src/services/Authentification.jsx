import axios from 'axios'
import { isExpired } from 'react-jwt'

export const isAuthenticated = () => {
    const { token } = getUserData()
    return token != null && !isExpired(token)
}

export async function login(data) {
    try {
        const result = await axios.post('/auth/login', data)

        if (result.status === 200) {
            window.localStorage.setItem(
                'user',
                JSON.stringify({
                    token: result.data.token,
                    userId: result.data.userId,
                    grade: result.data.grade,
                })
            )

            return { success: true }
        }

        return { success: false, error: 'Une erreur est survenue.' }
    } catch (error) {
        return { success: false, error }
    }
}

export async function signup(data) {
    try {
        const result = await axios.post('/auth/signup', data)

        if (result.status === 201) {
            return { success: true }
        }

        return { success: false, error: 'Une erreur est survenue.' }
    } catch (error) {
        return { success: false, error }
    }
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

import { isExpired } from 'react-jwt'
import axios from 'axios'

const login = async (data) => {
    try {
        const result = await axios.post('/auth/login', data)

        if (result.status === 200) {
            window.localStorage.setItem(
                'user',
                JSON.stringify({
                    token: result.data.token,
                    userId: result.data.userId,
                    userData: result.data.userData,
                    isAdmin: result.data.isAdmin,
                })
            )

            return { success: true }
        }

        return { success: false, error: 'Une erreur est survenue.' }
    } catch (error) {
        return { success: false, error }
    }
}

async function signup(data) {
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

function logout() {
    window.localStorage.removeItem('user')
    return window.localStorage.getItem('user') == null
}

const userData = () => {
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

const isAuthenticated = () => {
    const { token } = userData()

    if (token != null && !isExpired(token)) {
        return true
    } else {
        return !logout()
    }
}

export { login, signup, logout, userData, isAuthenticated }

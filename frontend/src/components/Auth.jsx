import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/Authentification'

const Auth = ({ Component }) => {
    return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />
}

export default Auth

import { Navigate, Outlet } from 'react-router-dom'
import * as User from './User'

export const AuthLayout = () => {
    return User.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
}

export default AuthLayout

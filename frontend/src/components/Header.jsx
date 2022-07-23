import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserData, isAuthenticated, logout } from '../services/Authentification'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Header() {
    const [currentData, setCurrentData] = useState({})
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const result = await axios.get(`/user/${getUserData().userId}`, {
                headers: {
                    Authorization: `Bearer ${getUserData().token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (result.status === 200) {
                setCurrentData(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = () => {
        const success = logout()

        if (success) {
            navigate('/login')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <header className="bg-gprimary">
            <Navbar expand="sm">
                <Container fluid mx="1">
                    <Navbar.Brand>
                        <Image src="/images/logo-white.svg" alt="Logo de groupomania" style={{ maxHeight: '40px' }} />
                    </Navbar.Brand>
                    {currentData.length > 0 && <Navbar.Brand className="fs-6 text-secondary">{`Connecté en tant que ${currentData.firstName} ${currentData.lastName}`}</Navbar.Brand>}
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end mt-3 mt-sm-0">
<<<<<<< HEAD
                        <Nav>
=======
                        <Nav className="align-items-center">
>>>>>>> cf2a93ff47ce6d3698b599936b822d7e04b9dbe4
                            {isAuthenticated() ? (
                                <Nav.Link className="btn btn-light" onClick={handleLogout}>
                                    Déconnexion
                                </Nav.Link>
                            ) : (
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link className="btn btn-light me-0 me-sm-2 mb-2 mb-sm-0">Connexion</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/signup">
                                        <Nav.Link className="btn btn-primary text-light">Inscription</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

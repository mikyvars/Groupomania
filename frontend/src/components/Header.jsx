import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserData, isAuthenticated, logout } from '../services/Authentification'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Header() {
    const navigate = useNavigate()

    const handleLogout = () => {
        const success = logout()

        if (success) {
            navigate('/login')
        }
    }

    return (
        <header className="bg-gprimary">
            <Navbar expand="sm">
                <Container mx="1">
                    <Navbar.Brand>
                        <LinkContainer to="/" style={{ maxHeight: '40px', cursor: 'pointer' }}>
                            <Image src="/images/logo-white.svg" alt="Logo de groupomania" />
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end mt-3 mt-sm-0">
                        <Nav>
                            {isAuthenticated() ? (
                                <>
                                    <LinkContainer to={`/profile/${getUserData().userId}`}>
                                        <Nav.Link className="btn btn-light me-0 me-sm-2 mb-2 mb-sm-0">Profil</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to={`/settings/${getUserData().userId}`}>
                                        <Nav.Link className="btn btn-light me-0 me-sm-2 mb-2 mb-sm-0">Parametres</Nav.Link>
                                    </LinkContainer>
                                    <Nav.Link className="btn btn-light" onClick={handleLogout}>
                                        Déconnexion
                                    </Nav.Link>
                                </>
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

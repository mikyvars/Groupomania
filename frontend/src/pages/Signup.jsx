import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signup } from '../services/Authentification'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        setError,
        watch,
    } = useForm({ mode: 'onTouched' })
    const password = watch('password')
    const [modalVisibility, setModalVisibility] = useState(false)

    const onSubmit = async (data) => {
        const { success, error } = await signup(data)

        if (success) {
            handleModalOpen()
        } else {
            const { status, data } = error.response

            if (status === 409) {
                setError('email', {
                    type: 'manual',
                    message: data.message,
                })
            }
        }
    }

    const handleModalOpen = () => setModalVisibility(true)
    const handleModalClose = () => setModalVisibility(false)

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ marginTop: '50px', maxWidth: '500px' }}>
            <Form noValidate onSubmit={handleSubmit(onSubmit)} className="w-100">
                <h1 className="text-center fs-2">Inscription</h1>
                <Form.Group as={Col} controlId="formFirstName">
                    <FloatingLabel controlId="floatingFirstName" label="Prénom" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Prénom"
                            required
                            isInvalid={errors.firstName && isSubmitted}
                            {...register('firstName', {
                                required: {
                                    value: true,
                                    message: 'Veuillez renseigner votre prénom.',
                                },
                                pattern: {
                                    value: /^[A-Za-zÀ-ú-' ]*$/,
                                    message: "Le champ ne peut contenir que des traits d'union, des apostrophes, des espaces et des lettres uniquement de l'alphabet.",
                                },
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.firstName && errors.firstName.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formLastName">
                    <FloatingLabel controlId="floatingLastName" label="Nom de famille" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Nom de famille"
                            required
                            isInvalid={errors.lastName && isSubmitted}
                            {...register('lastName', {
                                required: {
                                    value: true,
                                    message: 'Veuillez renseigner votre nom de famille.',
                                },
                                pattern: {
                                    value: /^[A-Za-zÀ-ú-' ]*$/,
                                    message: "Le champ ne peut contenir que des traits d'union, des apostrophes, des espaces et des lettres uniquement de l'alphabet.",
                                },
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.lastName && errors.lastName.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formEmail">
                    <FloatingLabel controlId="floatingEmail" label="Adresse e-mail" className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="john-doe@gmail.com"
                            required
                            isInvalid={errors.email && isSubmitted}
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Veuillez renseigner votre e-mail.',
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,10}$/,
                                    message: 'Veuillez respecter le format requis (exemple@domain.fr).',
                                },
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email && errors.email.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formPassword">
                    <FloatingLabel controlId="floatingPassword" label="Mot de passe" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Mot de passe"
                            required
                            isInvalid={errors.password && isSubmitted}
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Veuillez renseigner votre mot de passe.',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'Votre mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.',
                                },
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password && errors.password.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formPasswordConfirm">
                    <FloatingLabel controlId="floatingPasswordConfirm" label="Confirmation du mot de passe" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Confirmation du mot de passe"
                            required
                            isInvalid={errors.passwordConfirm && isSubmitted}
                            {...register('passwordConfirm', {
                                required: {
                                    value: true,
                                    message: 'Veuillez renseigner votre mot de passe.',
                                },
                                validate: (value) => value === password || 'Les mot de passe doivent être identiques.',
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.passwordConfirm && errors.passwordConfirm.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="d-flex justify-content-center">
                    <Button type="submit" className="w-50">
                        S'inscrire
                    </Button>
                </Form.Group>
            </Form>

            <Modal show={modalVisibility} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inscription réussie !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Groupomania vous remercie pour votre inscription !</p>
                    <p>Vous pouvez désormais échanger avec vos collaborateurs en tout simplicité 😊</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    <Link to="/login">
                        <Button variant="primary" className="justify-self-start">
                            Connexion
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Signup

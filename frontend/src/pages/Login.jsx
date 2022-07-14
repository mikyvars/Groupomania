import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/Authentification'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

function Login() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        setError,
    } = useForm({ mode: 'onTouched' })

    const onSubmit = async (data) => {
        const { success, error } = await login(data)

        if (success) {
            navigate('/')
        } else {
            const { status, data } = error.response

            if (status === 404) {
                setError('email', {
                    type: 'manual',
                    message: data.message,
                })
            } else if (status === 401) {
                setError('password', {
                    type: 'manual',
                    message: data.message,
                })
            }
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ marginTop: '50px', maxWidth: '500px' }}>
            <Form noValidate onSubmit={handleSubmit(onSubmit)} className="w-100">
                <h1 className="text-center fs-2">Connexion</h1>
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
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password && errors.password.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="d-flex justify-content-center">
                    <Button type="submit" className="w-50">
                        Se connecter
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Login

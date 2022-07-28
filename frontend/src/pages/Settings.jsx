/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getUserData } from '../services/Authentification'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

function Settings() {
    const [currentData, setCurrentData] = useState({})
    const [alertVisibility, setAlertVisibility] = useState(false)
    const [alertContent, setAlertContent] = useState({ type: '', message: '' })
    const { userId } = useParams()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitted },
    } = useForm({ mode: 'onTouched' })
    const navigate = useNavigate()
    const password = watch('password')

    const fetchData = async () => {
        try {
            const result = await axios.get(`/user/${getUserData().userId}`, {
                headers: {
                    Authorization: `Bearer ${getUserData().token}`,
                },
                data: {
                    userId: getUserData().userId,
                },
            })

            if (result.status === 200) {
                setCurrentData(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (data) => {
        console.log('data', data)
        // setAlertContent({
        //     type: 'success',
        //     message: 'Votre profil a été mit à jour !',
        // })
        // setAlertVisibility(true)

        const result = await axios.put(`/user/${getUserData().userId}`, {
            headers: {
                Authorization: `Bearer ${getUserData().token}`,
            },
            data: {
                userId: getUserData().userId,
            },
        })

        console.log(result)
    }

    useEffect(() => {
        if (getUserData().userId !== userId) {
            navigate('/')
        }

        fetchData()
    }, [])

    return (
        <Container style={{ marginTop: '50px', maxWidth: '500px' }}>
            <Alert show={alertVisibility} variant={alertContent.type} onClose={() => setAlertVisibility(false)} dismissible>
                <p>{alertContent.message}</p>
            </Alert>

            <Form noValidate className="d-flex flex-column" style={{ rowGap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Col}>
                    <Image src={currentData.imageUrl ? currentData.imageUrl : '/images/avatar.png'} className="rounded-circle d-block mx-auto mb-3" style={{ height: '200px' }} />
                    <Form.Control type="file" aria-label="Changer de photo de profil" {...register('avatar')} />
                    <Form.Control.Feedback>{errors.avatar && errors.avatar.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.FloatingLabel controlId="floatingBiography" label="Biographie">
                        <Form.Control as="textarea" placeholder="Biographie" {...register('biography')} />
                        <Form.Control.Feedback type="invalid">{errors.biography && errors.biography.message}</Form.Control.Feedback>
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} controlId="formPassword">
                    <FloatingLabel controlId="password" label="Mot de passe">
                        <Form.Control
                            type="password"
                            placeholder="Mot de passe"
                            isInvalid={errors.password && isSubmitted}
                            {...register('password', {
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'Votre mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.',
                                },
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password && errors.password.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col}>
                    <FloatingLabel controlId="passwordConfirm" label="Confirmation du mot de passe">
                        <Form.Control
                            type="password"
                            placeholder="Confirmation du mot de passe"
                            isInvalid={errors.passwordConfirm && isSubmitted}
                            {...register('passwordConfirm', {
                                validate: (value) => value === password || 'Les mots de passe doivent être identiques.',
                            })}
                        />
                        <Form.Control.Feedback type="invalid">{errors.passwordConfirm && errors.passwordConfirm.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <Button type="submit" className="w-50 d-block mx-auto">
                        Sauvegarder
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Settings

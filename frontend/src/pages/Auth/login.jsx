import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Style from './style'
import axios from 'axios'

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({ mode: 'onTouched' })

    const navigate = useNavigate()

    const onSubmit = (data) => {
        axios({
            method: 'POST',
            url: '/auth/login',
            data: {
                email: data.email,
                password: data.password,
            },
        })
            .then((result) => {
                window.localStorage.setItem(
                    'user',
                    JSON.stringify({
                        token: result.data.token,
                        userId: result.data.userId,
                        grade: result.data.grade,
                    })
                )
                navigate('/')
            })
            .catch((error) => {
                const response = error.response

                if (response.status === 404) {
                    setError('email', {
                        type: 'manual',
                        message: response.data.message,
                    })
                } else if (response.status === 401) {
                    setError('password', {
                        type: 'manual',
                        message: response.data.message,
                    })
                }
            })
    }

    return (
        <React.Fragment>
            <Style.StyledPage />
            <Style.StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Style.StyledFormTitle>Connectez-vous</Style.StyledFormTitle>
                <Style.StyledFormInput
                    defaultValue="michaelyvars1@gmail.com"
                    placeholder="Adresse e-mail"
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Veuillez renseigner votre email.',
                        },
                    })}
                />
                <Style.StyledFormError>{errors.email && errors.email.message}</Style.StyledFormError>

                <Style.StyledFormInput
                    defaultValue="mysecretpass"
                    type="password"
                    placeholder="Mot de passe"
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Veuillez renseigner votre mot de passe.',
                        },
                    })}
                />
                <Style.StyledFormError>{errors.password && errors.password.message}</Style.StyledFormError>

                <Style.StyledFormSubmit type="submit">Se connecter</Style.StyledFormSubmit>
                <Style.StyledFormSignup>
                    Pas encore inscrit ? Cliquez <Link to="/signup">ici</Link> pour vous inscrire !
                </Style.StyledFormSignup>
            </Style.StyledForm>
        </React.Fragment>
    )
}

export default Login

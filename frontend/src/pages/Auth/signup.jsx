import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Style from './style'
import axios from 'axios'

function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        watch,
    } = useForm({
        mode: 'onTouched',
    })

    const [isSuccessfullyRegistered, setIsSuccessfullyRegistered] = useState(false)
    const password = watch('password')

    const onSubmit = (data) => {
        axios({
            method: 'POST',
            url: '/auth/signup',
            data: {
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                password: data.password,
            },
        })
            .then((result) => {
                setIsSuccessfullyRegistered(true)
                clearErrors()
            })
            .catch((error) => {
                const response = error.response

                if (response.status === 409) {
                    setError('email', {
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
                <Style.StyledFormTitle>Inscrivez-vous</Style.StyledFormTitle>
                {isSuccessfullyRegistered && (
                    <Style.StyledFormSuccess>
                        Inscription réussie avec succès !<br />
                        Cliquez <Link to="/login">ICI</Link> pour vous connecter.
                    </Style.StyledFormSuccess>
                )}
                <Style.StyledFormInput
                    defaultValue="michael"
                    placeholder="Prénom"
                    {...register('firstname', {
                        required: { value: true, message: 'Veuillez renseigner votre prénom.' },
                        pattern: {
                            value: /^[A-Za-zÀ-ú-' ]*$/,
                            message: "Le champ ne peut contenir que des traits d'union, des apostrophes, des espaces et des lettres uniquement de l'alphabet.",
                        },
                    })}
                />
                <Style.StyledFormError>{errors.firstname && errors.firstname.message}</Style.StyledFormError>

                <Style.StyledFormInput
                    defaultValue="yvars"
                    placeholder="Nom de famille"
                    {...register('lastname', {
                        required: { value: true, message: 'Veuillez renseigner votre nom de famille.' },
                        pattern: {
                            value: /^[A-Za-zÀ-ú-' ]*$/,
                            message: "Le champ ne peut contenir que des traits d'union, des apostrophes, des espaces et des lettres uniquement de l'alphabet.",
                        },
                    })}
                />
                <Style.StyledFormError>{errors.lastname && errors.lastname.message}</Style.StyledFormError>

                <Style.StyledFormInput
                    defaultValue="michaelyvars1@gmail.com"
                    type="email"
                    placeholder="Adresse e-mail"
                    {...register('email', {
                        required: { value: true, message: 'Veuillez renseigner votre adresse e-mail..' },
                        pattern: {
                            value: /^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,10}$/,
                            message: 'Veuillez respecter le format requis (exemple@domain.fr).',
                        },
                    })}
                />
                <Style.StyledFormError>{errors.email && errors.email.message}</Style.StyledFormError>

                <Style.StyledFormInput
                    defaultValue="Mysecretpass1!"
                    type="password"
                    placeholder="Mot de passe"
                    {...register('password', {
                        required: { value: true, message: 'a' },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Votre mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.',
                        },
                    })}
                />
                <Style.StyledFormError>{errors.password && errors.password.message}</Style.StyledFormError>

                <Style.StyledFormInput
                    defaultValue="Mysecretpass1!"
                    type="password"
                    placeholder="Confirmation du mot de passe"
                    {...register('passwordConfirm', {
                        required: { value: true, message: 'a' },
                        validate: (value) => value === password || 'Les mot de passe doivent être identiques.',
                    })}
                />
                <Style.StyledFormError>{errors.passwordConfirm && errors.passwordConfirm.message}</Style.StyledFormError>

                <Style.StyledFormSubmit
                    type="submit"
                    disabled={isSuccessfullyRegistered}
                    onClick={handleSubmit(onSubmit)}
                >
                    S'inscrire
                </Style.StyledFormSubmit>
                <Style.StyledFormSignup>
                    Déjà inscrit ? Cliquez <Link to="/login">ici</Link> pour vous connecter !
                </Style.StyledFormSignup>
            </Style.StyledForm>
        </React.Fragment>
    )
}

export default Signup

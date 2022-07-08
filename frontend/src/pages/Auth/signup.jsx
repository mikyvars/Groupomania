import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import * as Style from './style'

function Signup() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isSubmitSuccessful, isValid, errors },
    } = useForm({
        mode: 'onChange',
    })

    const onSubmit = (data) => {
        // setError('email', {
        //     type: 'manual',
        //     message: 'email deja utilisée',
        // })
    }

    return (
        <React.Fragment>
            <Style.StyledPage />
            <Style.StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Style.StyledFormTitle>Inscrivez-vous</Style.StyledFormTitle>
                <Style.StyledFormSuccess> {isSubmitSuccessful && `Inscription réussie avec succès ! Cliquez ici pour vous connecter.`}</Style.StyledFormSuccess>
                <Style.StyledFormInput
                    placeholder="Prénom"
                    {...register('firstname', {
                        required: { value: true, message: 'Veuillez renseigner votre prénom.' },
                    })}
                />
                <Style.StyledFormError>{errors.firstname && errors.firstname.message}</Style.StyledFormError>

                <Style.StyledFormInput
                    placeholder="Nom de famille"
                    {...register('lastname', {
                        required: { value: true, message: 'Veuillez renseigner votre nom de famille.' },
                    })}
                />
                <Style.StyledFormError>{errors.lastname && errors.lastname.message}</Style.StyledFormError>

                <Style.StyledFormInput
                    type="email"
                    placeholder="Adresse e-mail"
                    {...register('email', {
                        required: { value: true, message: 'Veuillez renseigner votre adresse e-mail..' },
                    })}
                />
                <Style.StyledFormError>{errors.email && errors.email.message}</Style.StyledFormError>

                <Style.StyledFormInput
                    type="password"
                    placeholder="Mot de passe"
                    {...register('password', {
                        required: { value: true, message: 'a' },
                    })}
                />
                <Style.StyledFormError>{errors.password && errors.password.message}</Style.StyledFormError>

                <Style.StyledFormInput
                    type="password"
                    placeholder="Confirmation du mot de passe"
                    {...register('passwordConfnirm', {
                        required: { value: true, message: 'a' },
                    })}
                />
                <Style.StyledFormError>{errors.password && errors.password.message}</Style.StyledFormError>

                <Style.StyledFormSubmit
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    onClick={handleSubmit(onSubmit)}
                >
                    S'inscrire
                </Style.StyledFormSubmit>
            </Style.StyledForm>
        </React.Fragment>
    )
}

export default Signup

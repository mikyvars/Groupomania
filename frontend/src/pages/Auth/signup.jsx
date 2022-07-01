import React from 'react'
import * as Style from './style'

function Signup() {
    return (
        <React.Fragment>
            <Style.StyledPage />
            <Style.StyledForm method="POST">
                <Style.StyledFormTitle>Inscrivez-vous</Style.StyledFormTitle>
                <Style.StyledFormInput type="text" name="firstname" id="firstname" placeholder="Prénom" />
                <Style.StyledFormError id="firstnameError"></Style.StyledFormError>
                <Style.StyledFormInput type="text" name="lastname" id="lastname" placeholder="Nom de famille" />
                <Style.StyledFormError id="lastnameError"></Style.StyledFormError>
                <Style.StyledFormInput type="email" name="email" id="email" placeholder="Adresse e-mail" />
                <Style.StyledFormError id="emailError"></Style.StyledFormError>
                <Style.StyledFormInput type="password" name="password" id="password" placeholder="Mot de passe" />
                <Style.StyledFormError id="passwordError"></Style.StyledFormError>
                <Style.StyledFormSubmit type="submit">S'inscrire</Style.StyledFormSubmit>
            </Style.StyledForm>
        </React.Fragment>
    )
}

export default Signup

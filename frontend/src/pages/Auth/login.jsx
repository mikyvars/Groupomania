import React from 'react'
import * as Style from './style'

function Login() {
    return (
        <React.Fragment>
            <Style.StyledPage />
            <Style.StyledForm method="POST">
                <Style.StyledFormTitle>Connectez-vous</Style.StyledFormTitle>
                <Style.StyledFormInput type="text" name="email" id="email" placeholder="Adresse e-mail" />
                <Style.StyledFormInput type="password" name="password" id="password" placeholder="Mot de passe" />
                <Style.StyledFormSubmit type="submit">Se connecter</Style.StyledFormSubmit>
            </Style.StyledForm>
        </React.Fragment>
    )
}

export default Login

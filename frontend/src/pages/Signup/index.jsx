import React from 'react'
import * as style from './style'

function Signup() {
    return (
        <React.Fragment>
            <style.StyledPage />
            <style.StyledForm method="POST">
                <style.StyledFormTitle>Inscrivez-vous</style.StyledFormTitle>
                <style.StyledFormInput type="text" name="firstname" id="firstname" placeholder="Prénom" />
                <style.StyledFormInput type="text" name="lastname" id="lastname" placeholder="Nom de famille" />
                <style.StyledFormInput type="email" name="email" id="email" placeholder="Adresse e-mail" />
                <style.StyledFormInput type="password" name="password" id="password" placeholder="Mot de passe" />
                <style.StyledFormSubmit type="submit">S'inscrire</style.StyledFormSubmit>
            </style.StyledForm>
        </React.Fragment>
    )
}

export default Signup

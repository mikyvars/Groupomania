import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import colors from '../../utils/colors'

const StyledPage = createGlobalStyle`
    body {
        background-image: url(/images/background.jpg);
        background-position: fixed;
    }
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color: ${colors.tertiary};
    max-width: 500px;
    align-items: center;
    margin: 50px auto;
    padding: 25px 50px;
`

const StyledFormTitle = styled.h1`
    font-size: 26px;
    color: #fff;
`

const StyledFormInput = styled.input`
    width: 100%;
    margin-bottom: 15px;
    padding: 10px 5px;
    outline: none;
`

const StyledFormSubmit = styled.button`
    padding: 15px 30px;
    background-color: ${colors.primary};
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
`

function Signup() {
    return (
        <React.Fragment>
            <StyledPage />
            <StyledForm method="POST">
                <StyledFormTitle>Inscrivez-vous</StyledFormTitle>
                <StyledFormInput type="text" name="firstname" id="firstname" placeholder="Prénom" />
                <StyledFormInput type="text" name="lastname" id="lastname" placeholder="Nom de famille" />
                <StyledFormInput type="email" name="email" id="email" placeholder="Adresse e-mail" />
                <StyledFormInput type="password" name="password" id="password" placeholder="Mot de passe" />
                <StyledFormSubmit type="submit">S'inscrire</StyledFormSubmit>
            </StyledForm>
        </React.Fragment>
    )
}

export default Signup

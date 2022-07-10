import styled, { createGlobalStyle } from 'styled-components'
import colors from '../../utils/colors'

export const StyledPage = createGlobalStyle`
    body {
        background-image: url(/images/background.jpg);
        background-position: fixed;
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color: ${colors.tertiary};
    max-width: 500px;
    align-items: center;
    margin: 50px auto;
    padding: 25px 50px;
`

export const StyledFormTitle = styled.h1`
    font-size: 26px;
    color: #fff;
`

export const StyledFormSuccess = styled.h2`
    font-size: 20px;
    color: ${colors.secondary};

    a {
        color: inherit;
    }
`

export const StyledFormInput = styled.input`
    width: 100%;
    margin-top: 15px;
    padding: 10px 5px;
    outline: none;
`

export const StyledFormError = styled.p`
    color: ${colors.primary};
    align-self: flex-start;
    margin: 5px 0 0 -7px;
    font-size: 14px;
`

export const StyledFormSubmit = styled.button`
    padding: 15px 30px;
    background-color: ${colors.primary};
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 15px;

    :disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
`
export const StyledFormSignup = styled.p`
    color: #fff;
    margin-top: 15px;

    a {
        color: ${colors.secondary};
        text-decoration: none;
    }
`

import styled from 'styled-components'
import colors from '../../utils/colors'

const StyledHeader = styled.header`
    background-color: ${colors.tertiary};
    height: 75px;
    display: flex;
    align-items: center;

    img {
        height: 50px;
        margin: 0 auto;
        display: block;
    }

    i {
        font-size: 26px;
        color: #fff;
        position: absolute;
        right: 25px;
        cursor: pointer;
    }
`

function Header() {
    return (
        <StyledHeader>
            <img src="/images/logo-white.svg" alt="Logo de groupomania" />
            <i className="fa-solid fa-right-from-bracket"></i>
        </StyledHeader>
    )
}

export default Header

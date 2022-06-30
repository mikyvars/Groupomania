import styled from 'styled-components'
import colors from '../../utils/colors'

const StyledHeader = styled.header`
    background-color: ${colors.tertiary};
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
`

function Header() {
    return (
        <StyledHeader>
            <img style={{ height: 50 }} src="/images/logo-white.svg" alt="Logo de groupomania" />
        </StyledHeader>
    )
}

export default Header

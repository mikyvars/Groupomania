import styled from 'styled-components'
import colors from '../../utils/colors'
import sizes from '../../utils/sizes'

export const StyledBackground = styled.div`
    background-color: #000;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.5;
`

export const StyledModal = styled.div`
    background-color: ${colors.tertiary};
    color: #fff;
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
    padding: 15px;
    opacity: 1;
    width: 30%;

    @media screen and (max-width: ${sizes.mobile}) {
        width: 90%;
    }

    .modal__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: bold;

        span {
            font-size: 26px;
            cursor: pointer;
        }
    }

    .modal__content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 15px;

        body {
            opacity: 0.5;
        }

        input,
        textarea {
            border: 1px solid silver;
            margin-top: 15px;
            padding: 5px;
            outline: none;
        }

        button {
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
        }

        .modal__error {
            color: ${colors.primary};
        }
    }
`

import styled from 'styled-components'
import colors from '../../utils/colors'
import sizes from '../../utils/sizes'

export const StyledContent = styled.div`
    display: flex;
    width: 70%;
    margin: 25px auto 0 auto;
    column-gap: 75px;

    @media screen and (max-width: ${sizes.laptop}) {
        flex-direction: column;
    }
`

export const StyledSidebar = styled.aside`
    flex: 1 1 auto;
`

export const StyledSidebarProfile = styled.div`
    display: flex;

    .profile__avatar {
        height: 50px;
    }

    .profile__identity {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
    }
`

export const StyledSidebarContent = styled.div`
    margin-top: 50px;

    .content__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .content__title {
            font-size: 16px;
        }

        .content__new {
            cursor: pointer;
            height: 30px;
            border: none;
            color: ${colors.tertiary};
            font-size: 14px;
            font-weight: bold;
            background-color: ${colors.secondary};
        }
    }

    .content__announce {
        border: 1px solid silver;

        .announce {
            display: flex;
            flex-direction: column;
            padding: 5px;
            border-bottom: 1px solid silver;
            text-align: justify;

            &:last-child {
                border-bottom: none;
            }

            &__header {
                display: flex;
                column-gap: 10px;
            }

            &__content {
                margin-top: 15px;
            }
        }
    }

    @media screen and (max-width: ${sizes.laptop}) {
        .announce__header {
            flex-direction: column;
        }
    }
`

export const StyledFeed = styled.section`
    flex: 3 1 auto;
    min-width: 700px;

    .feed__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .feed__title {
            font-size: 16px;
        }

        .feed__new {
            cursor: pointer;
            height: 30px;
            border: none;
            color: ${colors.tertiary};
            font-size: 14px;
            font-weight: bold;
            background-color: ${colors.secondary};
        }
    }

    .feed__posts {
        .post {
            display: flex;
            flex-direction: column;
            padding: 15px 0;
            border-bottom: 1px solid silver;

            &:last-child {
                border-bottom: none;
            }

            &__header {
                display: flex;

                .feed__avatar {
                    height: 50px;
                }

                .post__identity {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-left: 10px;
                }
            }

            &__content {
                margin: 15px 0;
                text-align: justify;

                img {
                    width: 100%;
                    max-width: 100%;
                    height: 350px;
                    object-fit: cover;
                    justify-self: flex-start;
                    margin-top: 5px;
                }
            }

            &__footer {
                display: flex;
                column-gap: 5px;

                i {
                    font-size: 18px;
                    color: ${colors.primary};
                    cursor: pointer;
                }
            }
        }
    }

    @media screen and (max-width: ${sizes.laptop}) {
        margin-top: 50px;
    }
`
export const StyledModal = styled.div``

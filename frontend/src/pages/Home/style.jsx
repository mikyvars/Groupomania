import styled from 'styled-components'
import colors from '../../utils/colors'
import sizes from '../../utils/sizes'

export const StyledContent = styled.div`
    display: flex;
    width: 70%;
    margin: 25px auto 0 auto;
    column-gap: 75px;

    @media screen and (max-width: ${sizes.tablet}) {
        flex-direction: column;
    }
`

export const StyledSidebar = styled.aside`
    // background-color: rgba(255, 0, 0, 0.1);
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

    .content__title {
        font-size: 16px;
    }

    .content__announce {
        border: 1px solid silver;

        .announce {
            display: flex;
            flex-direction: column;
            padding: 5px;
            border-bottom: 1px solid silver;

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

    @media screen and (max-width: ${sizes.tablet}) {
        .announce__header {
            flex-direction: column;
        }
    }
`

export const StyledFeed = styled.section`
    flex: 3 1 auto;

    .feed__title {
        font-size: 16px;
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

                img {
                    width: 500px;
                    height: 250px;
                    object-fit: cover;
                    justify-self: flex-start;
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

    @media screen and (max-width: ${sizes.tablet}) {
        margin-top: 50px;
    }
`

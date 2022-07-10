import { useForm } from 'react-hook-form'
import { StyledBackground, StyledModal } from './style.jsx'
import { getUserData } from '../../services/Authentification'
import axios from 'axios'

function ModalNews({ closeModal }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onTouched' })

    const onSubmit = (data) => {
        axios
            .post(
                '/news',
                {
                    title: data.title,
                    content: data.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getUserData().token}`,
                    },
                }
            )
            .then((result) => {
                closeModal()
            })
            .catch((error) => {
                const response = error.response

                if (response.status === 401) {
                    console.log('non connecté')
                }
            })
    }
    return (
        <>
            <StyledBackground></StyledBackground>
            <StyledModal>
                <div className="modal__header">
                    <p>Nouvelle actualité</p>
                    <span onClick={closeModal}>&times;</span>
                </div>
                <form
                    className="modal__content"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        placeholder="Titre"
                        {...register('title', {
                            required: {
                                value: true,
                                message: 'Veuillez saisir un titre.',
                            },
                        })}
                    />
                    <p className="modal__error">{errors.title && errors.title.message}</p>

                    <textarea
                        cols="30"
                        rows="10"
                        placeholder="Contenu"
                        {...register('content', {
                            required: {
                                value: true,
                                message: 'Veuillez saisir du contenu.',
                            },
                        })}
                    ></textarea>
                    <p className="modal__error">{errors.content && errors.content.message}</p>

                    <button type="submit">Envoyer</button>
                </form>
            </StyledModal>
        </>
    )
}

export default ModalNews

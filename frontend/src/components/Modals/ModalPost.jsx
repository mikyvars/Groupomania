import { useForm } from 'react-hook-form'
import { StyledBackground, StyledModal } from './style.jsx'
import { getUserData } from '../../services/Authentification'
import axios from 'axios'

function ModalPost({ closeModal }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onTouched' })

    const onSubmit = (data) => {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/api/post',
            headers: {
                Authorization: `Bearer ${getUserData().token}`,
            },
            data: {
                post: {
                    userId: getUserData().userId,
                    content: data.content,
                },
            },
        })
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
            <StyledModal onSubmit={handleSubmit(onSubmit)}>
                <div className="modal__header">
                    <p>Nouveau post</p>
                    <span onClick={closeModal}>&times;</span>
                </div>
                <form className="modal__content">
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

export default ModalPost

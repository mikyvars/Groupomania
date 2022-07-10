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
        let formData = new FormData()
        formData.append('postedBy', getUserData().userId)
        formData.append('content', data.content)
        formData.append('image', data.image[0])

        axios
            .post('/post', formData, {
                headers: {
                    Authorization: `Bearer ${getUserData().token}`,
                    'Content-Type': 'multipart/form-data',
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
            <StyledModal>
                <div className="modal__header">
                    <p>Nouveau post</p>
                    <span onClick={closeModal}>&times;</span>
                </div>
                <form
                    className="modal__content"
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                    <input
                        type="file"
                        accept="image/png,image/jpg,image/jpeg,image/gif"
                        {...register('image')}
                    />
                    <button type="submit">Envoyer</button>
                </form>
            </StyledModal>
        </>
    )
}

export default ModalPost

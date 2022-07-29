import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getUserData } from '../../services/Authentification'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'

function PostCreate({ refresh }) {
    const [currentError, setCurrentError] = useState({ visibility: false, type: 'error', message: '' })
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onTouched' })

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('postedBy', getUserData().userId)
        formData.append('content', data.content)
        formData.append('image', data.image[0])

        try {
            const result = await axios.post('/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (result.status === 201) {
                setCurrentError({ visibility: false })
                refresh()
                reset()
            }
        } catch (error) {
            setCurrentError({ visibility: true, type: 'danger', message: 'Votre publication a du se perdre dans le multivers.' })
        }
    }

    return (
        <>
            <Alert show={currentError.visibility} variant={currentError.type} onClose={() => setCurrentError({ visibility: false })} dismissible>
                <Alert.Heading>Oups, une erreur est survenue 😖</Alert.Heading>
                {currentError.message}
            </Alert>

            <Form className="p-3 bg-gprimary rounded-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex align-items-center text-white">
                    <h1 className="fs-7">
                        Connecté en tant que
                        <span className="text-capitalize ms-1">
                            "{getUserData().userData.firstName} {getUserData().userData.lastName}"
                        </span>
                    </h1>
                </div>
                <Form.Group controlId="formContent" className="mt-2">
                    <FloatingLabel controlId="floatingContent" label="Nouvelle publication...">
                        <Form.Control as="textarea" placeholder="Nouvelle publication..." required {...register('content')} minLength="10" />
                        <Form.Control.Feedback type="invalid">{errors.content && errors.content.message}</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Control type="file" {...register('image')} aria-label="Ajouter une image" />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Button type="submit" className="w-100">
                        Publier
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default PostCreate

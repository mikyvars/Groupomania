import { useForm } from 'react-hook-form'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import * as User from '../../services/User'

function PostEdit({ postData, refresh, close }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onTouched' })

    const onSubmit = async (form) => {
        const formData = new FormData()
        formData.append('userId', User.userData().userId)
        formData.append('content', form.content)
        formData.append('image_delete', form.image_delete)
        formData.append('image', form.image[0])

        try {
            const result = await axios.put(`/post/${postData._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (result.status === 200) {
                refresh()
                close()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={true} onHide={close}>
            <Modal.Header>Modifier la publication</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <FloatingLabel label="Modifier la publication">
                            <Form.Control as="textarea" placeholder="Modifier la publication" defaultValue={postData.content} required minLength="10" {...register('content')} />
                            <Form.Control.Feedback type="invalid">{errors.content && errors.content.message}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Control type="file" {...register('image')} />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Check label="Supprimer le fichier" disabled={postData.imageUrl === null} {...register('image_delete')} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-start">
                <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                    Modifier
                </Button>
                <Button variant="danger" onClick={close}>
                    Annuler
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PostEdit

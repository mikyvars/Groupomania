import { useState } from 'react'
import { ThreeDotsVertical, HeartFill } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { getUserData } from '../services/Authentification'

function Post({ data, refreshData }) {
    const { posted, content, imageUrl, usersLiked } = data
    const { firstName, lastName } = data.postedBy
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({ mode: 'onTouched' })
    const [modalVisibility, setModalVisibility] = useState(false)
    const dateFormat = new Date(posted).toLocaleDateString('fr-FR')
    const timeFormat = new Date(posted).toLocaleTimeString('fr-FR')

    const handleModalOpen = () => {
        setModalVisibility(true)
    }

    const handleModalClose = () => {
        setModalVisibility(false)
    }

    const onSubmit = async (form) => {
        const formData = new FormData()
        formData.append('userId', getUserData().userId)
        formData.append('content', form.content)
        formData.append('image', form.image[0])

        try {
            const result = await axios.put(`/post/${data._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${getUserData().token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (result.status === 200) {
                setModalVisibility(false)
                refreshData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onDelete = async () => {
        if (window.confirm('Voulez vous supprimez cette publication?')) {
            try {
                const result = await axios.delete(`/post/${data._id}`, {
                    headers: {
                        Authorization: `Bearer ${getUserData().token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })

                if (result.status === 200) {
                    refreshData()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    console.log(data.postedBy === getUserData().userId, getUserData().grade === 'admin')

    return (
        <>
            <article className="bg-light p-3 mt-2 rounded-1 border border-1" style={{ borderColor: 'silver' }}>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <Image src="/images/avatar.png" className="rounded-circle" style={{ height: '50px' }} />
                    </div>
                    <div className="ms-2 flex-grow-1">
                        <p className="text-capitalize">
                            {firstName} {lastName}
                        </p>
                        <p className="fs-8">
                            Publié le {dateFormat} à {timeFormat}
                        </p>
                    </div>
                    {(data.postedBy._id === getUserData().userId || getUserData().grade === 'admin') && (
                        <div style={{ justifySelf: 'flex-end' }}>
                            <Dropdown>
                                <Dropdown.Toggle bsPrefix="p-0" className="bg-transparent border-0">
                                    <ThreeDotsVertical style={{ cursor: 'pointer' }} className="text-dark" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleModalOpen}>Modifier</Dropdown.Item>
                                    <Dropdown.Item onClick={onDelete}>Supprimer</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )}
                </div>
                <div className="my-3">
                    {content} {imageUrl && <Image src={imageUrl} style={{ height: '300px', width: '100%', objectFit: 'cover' }} />}
                </div>
                <div className="d-flex align-items-center">
                    <HeartFill className="fs-5 text-danger" style={{ cursor: 'pointer' }} />
                    <p className="fs-7 ms-1">{usersLiked.length}</p>
                </div>
            </article>
            <Modal show={modalVisibility} onHide={handleModalClose}>
                <Modal.Header>Modifier la publication</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.FloatingLabel label="Modifier la publication">
                                <Form.Control as="textarea" placeholder="Modifier la publication" defaultValue={content} required minLength="10" {...register('content')} />
                                <Form.Control.Feedback type="invalid">{errors.content && errors.content.message}</Form.Control.Feedback>
                            </Form.FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Control type="file" {...register('image')} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        Modifier
                    </Button>
                    <Button variant="danger" onClick={handleModalClose}>
                        Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Post

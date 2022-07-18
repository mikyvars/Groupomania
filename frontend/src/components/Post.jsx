import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getUserData } from '../services/Authentification'
import { ThreeDotsVertical, Heart, HeartFill } from 'react-bootstrap-icons'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function Post({ postId, refreshData }) {
    const [currentData, setCurrentData] = useState([])
    const [modalVisibility, setModalVisibility] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onTouched' })

    const handleModalOpen = () => {
        setModalVisibility(true)
    }

    const handleModalClose = () => {
        setModalVisibility(false)
    }

    const fetchData = async () => {
        try {
            const result = await axios.get(`/post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${getUserData().token}`,
                },
                data: {
                    userId: getUserData().userId,
                },
            })

            setCurrentData(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (form) => {
        const formData = new FormData()
        formData.append('userId', getUserData().userId)
        formData.append('content', form.content)
        formData.append('image', form.image[0])

        try {
            const result = await axios.put(`/post/${postId}`, formData, {
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
                const result = await axios.delete(`/post/${postId}`, {
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

    const onLike = async () => {
        try {
            const result = await axios.post(
                `/post/${postId}/like`,
                {
                    userId: getUserData().userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getUserData().token}`,
                    },
                }
            )

            if (result.status === 200) {
                fetchData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        currentData.length !== 0 && (
            <>
                <article className="bg-light p-3 mt-2 rounded-1 border border-1" style={{ borderColor: 'silver' }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <Image src="/images/avatar.png" className="rounded-circle" style={{ height: '50px' }} />
                        </div>
                        <div className="ms-2 flex-grow-1">
                            <p className="text-capitalize">
                                {currentData.postedBy.firstName} {currentData.postedBy.lastName}
                            </p>
                            <p className="fs-8">
                                Publié le {new Date(currentData.posted).toLocaleDateString('fr-FR')} à {new Date(currentData.posted).toLocaleTimeString('fr-FR')}
                            </p>
                        </div>
                        {(currentData.postedBy._id === getUserData().userId || getUserData().grade === 'admin') && (
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
                        {currentData.content} {currentData.imageUrl && <Image src={currentData.imageUrl} style={{ height: '300px', width: '100%', objectFit: 'cover' }} />}
                    </div>
                    <div className="d-flex align-items-center">
                        {currentData.usersLiked.includes(getUserData().userId) ? (
                            <HeartFill className="fs-5 text-danger" style={{ cursor: 'pointer' }} onClick={onLike} />
                        ) : (
                            <Heart className="fs-5 text-danger" style={{ cursor: 'pointer' }} onClick={onLike} />
                        )}

                        <p className="fs-7 ms-1">{currentData.usersLiked.length}</p>
                    </div>
                </article>
                <Modal show={modalVisibility} onHide={handleModalClose}>
                    <Modal.Header>Modifier la publication</Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.FloatingLabel label="Modifier la publication">
                                    <Form.Control as="textarea" placeholder="Modifier la publication" defaultValue={currentData.content} required minLength="10" {...register('content')} />
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
    )
}

export default Post

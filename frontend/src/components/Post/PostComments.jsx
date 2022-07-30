/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Trash } from 'react-bootstrap-icons'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import * as User from '../../services/User'

function PostComments({ postId, close }) {
    const [currentData, setCurrentData] = useState([])
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onTouched' })

    const fetchData = async () => {
        try {
            const result = await axios.get(`/post/${postId}/comments`)

            if (result.status === 200) {
                setCurrentData(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (data) => {
        try {
            const result = await axios.post(`/post/${postId}/comment`, { content: data.content, postId, postedBy: User.userData().userId })

            if (result.status === 201) {
                fetchData()
                reset()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onDelete = async (commentId) => {
        if (window.confirm('Vous vous supprimer ce commentaire ?')) {
            try {
                const result = await axios.delete(`/post/${postId}/comment/${commentId}`)

                if (result.status === 200) {
                    fetchData()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Modal show={true} onHide={close} style={{ overflowY: 'initial' }}>
            <Modal.Header closeButton>
                <Modal.Title>Commentaires</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column" style={{ maxHeight: '75vh', overflowY: 'auto', rowGap: '10px' }}>
                {currentData.length === 0 ? (
                    <p>Que c'est calme par ici 👀</p>
                ) : (
                    currentData.map((element, index) => (
                        <Card key={element._id}>
                            <Card.Header className="d-flex justify-content-between align-items-center fs-8" style={{ padding: '4px 10px' }}>
                                <p>
                                    Publié par {element.postedBy.firstName} {element.postedBy.lastName} le {new Date(element.posted).toLocaleDateString('fr-FR')} à{' '}
                                    {new Date(element.posted).toLocaleTimeString('fr-FR')}
                                </p>
                                {element.postedBy._id === User.userData().userId && <Trash style={{ cursor: 'pointer' }} onClick={() => onDelete(element._id)} />}
                            </Card.Header>
                            <Card.Body style={{ padding: '10px' }}>{element.content}</Card.Body>
                        </Card>
                    ))
                )}
            </Modal.Body>
            <Modal.Footer>
                <Form noValidate onSubmit={handleSubmit(onSubmit)} className="d-flex flex-fill">
                    <Form.Group className="flex-fill me-2">
                        <Form.Control type="text" placeholder="Ajouter un commentaire..." required isInvalid={errors.content} {...register('content', { required: true })} />
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" className="h-100">
                            Publier
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Footer>
        </Modal>
    )
}

export default PostComments

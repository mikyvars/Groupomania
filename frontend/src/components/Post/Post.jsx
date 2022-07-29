/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { ThreeDotsVertical, Heart, HeartFill } from 'react-bootstrap-icons'
import { getUserData } from '../../services/Authentification'
import PostComment from './PostComments'
import PostEdit from './PostEdit'
import axios from 'axios'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

function Post({ postId, refreshData }) {
    const [currentData, setCurrentData] = useState([])
    const [commentsVisibility, setCommentsVisibility] = useState(false)
    const [editVisibility, setEditVisibility] = useState(false)

    const closeComments = () => setCommentsVisibility(false)
    const closeEdit = () => setEditVisibility(false)

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

            if (result.status === 200) {
                setCurrentData(result.data)
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
                    },
                    data: {
                        userId: getUserData().userId,
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
    }, [])

    return (
        currentData.length !== 0 && (
            <>
                {commentsVisibility && <PostComment postId={postId} close={closeComments} />}
                {editVisibility && <PostEdit postData={currentData} refresh={fetchData} close={closeEdit} />}
                <article className="bg-light p-3 mt-2 rounded-1 border border-1" style={{ borderColor: 'silver' }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <Image
                                src="/images/avatar.png"
                                alt={`Photo de profil de ${currentData.postedBy.firstName} ${currentData.postedBy.lastName}`}
                                className="rounded-circle"
                                style={{ height: '50px' }}
                            />
                        </div>
                        <div className="ms-2 flex-grow-1">
                            <p className="text-capitalize">
                                {currentData.postedBy.firstName} {currentData.postedBy.lastName}
                            </p>
                            <p className="fs-8">
                                Publié le {new Date(currentData.posted).toLocaleDateString('fr-FR')} à {new Date(currentData.posted).toLocaleTimeString('fr-FR')}
                            </p>
                        </div>
                        {(currentData.postedBy._id === getUserData().userId || getUserData().isAdmin === true) && (
                            <div style={{ justifySelf: 'flex-end' }}>
                                <Dropdown>
                                    <Dropdown.Toggle bsPrefix="p-0" className="bg-transparent border-0 remove-boxShadow" aria-label="Options de la publication">
                                        <ThreeDotsVertical style={{ cursor: 'pointer' }} className="text-dark" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setEditVisibility(true)}>Modifier</Dropdown.Item>
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
                            <Button className="bg-transparent text-dark remove-boxShadow fs-8" style={{ borderColor: 'silver', padding: '3px 6px' }} onClick={onLike}>
                                <HeartFill className="text-danger" />
                            </Button>
                        ) : (
                            <Button className="bg-transparent text-dark remove-boxShadow fs-8" style={{ borderColor: 'silver', padding: '3px 6px' }} onClick={onLike}>
                                <Heart />
                            </Button>
                        )}
                        <Button className="bg-transparent text-dark remove-boxShadow ms-1 fs-8" style={{ borderColor: 'silver', padding: '3px 6px' }} onClick={() => setCommentsVisibility(true)}>
                            Commentaires
                        </Button>
                    </div>
                </article>
            </>
        )
    )
}

export default Post

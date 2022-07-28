/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserData } from '../services/Authentification'
import axios from 'axios'
import Post from '../components/Post'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Pagination from 'react-bootstrap/Pagination'
import Spinner from 'react-bootstrap/Spinner'

function Profile() {
    const [currentData, setCurrentData] = useState({})
    const [currentPosts, setCurrentPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPagination, setCurrentPagination] = useState([])
    const [isDataLoading, setIsDataLoading] = useState(true)
    const { userId } = useParams()
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const result = await axios.get(`/user/${getUserData().userId}`, {
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

    const fetchPosts = async () => {
        try {
            const result = await axios.get(`/user/${getUserData().userId}/posts`, {
                headers: {
                    Authorization: `Bearer ${getUserData().token}`,
                },
                data: {
                    userId: getUserData().userId,
                },
            })

            if (result.status === 200) {
                setCurrentPosts(result.data)
                setIsDataLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (userId !== getUserData().userId) {
            navigate('/')
            return
        }

        fetchData()
        fetchPosts()
    }, [])

    useEffect(() => {
        let items = []

        for (let i = 1; i <= Math.ceil(currentPosts.length / 5); i++) {
            items.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                    {i}
                </Pagination.Item>
            )
        }

        setCurrentPagination(items)
    }, [currentPage, currentPosts])

    return (
        <Container className="mt-2 p-3 w-auto d-flex" style={{ columnGap: '15px' }}>
            <div className="flex-fill d-flex flex-column">
                <div className="d-flex">
                    <Image src="/images/avatar.png" className="rounded-circle" height="150" width="150" />
                    <h1 className="fs-2">
                        {currentData.firstName} {currentData.lastName}
                    </h1>
                    <p>Suivi par 0 personne(s)</p>
                </div>
                <div className="bg-light p-3 mt-2 rounded-1 border border-1">
                    <h2 className="fs-4">Biographie</h2>
                    <p>{currentData.biography === null || currentData.biography === '' ? "Cet utilisateur n'a pas renseigné de biographie pour le moment." : currentData.biography}</p>
                </div>
            </div>
            <div className="flex-fill" style={{ maxWidth: '700px' }}>
                {currentPosts.length === 0 ? (
                    isDataLoading ? (
                        <Spinner animation="border" role="status" variant="danger" className="fs-5 mx-auto mt-5 d-block" style={{ height: '75px', width: '75px' }}>
                            <span className="visually-hidden">Chargement...</span>
                        </Spinner>
                    ) : (
                        <p className="text-center fs-5 mt-5 d-block">Il n'y a rien à afficher ici :c</p>
                    )
                ) : (
                    currentPosts.slice((currentPage - 1) * 5, currentPage * 5).map((element) => <Post key={element._id} postId={element._id} refreshData={fetchPosts} />)
                )}
                {currentPosts.length > 5 && (
                    <Pagination className={currentPosts.length === 0 ? 'd-none' : 'mt-2 justify-content-center'}>
                        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                        {currentPagination.length > 1 && currentPagination}
                        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(currentPosts.length / 5)} />
                    </Pagination>
                )}
            </div>
        </Container>
    )
}

export default Profile

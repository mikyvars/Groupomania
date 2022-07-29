import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Pagination from 'react-bootstrap/Pagination'
import Post from '../components/Post/Post'
import Spinner from 'react-bootstrap/Spinner'
import PostCreate from '../components/Post/PostCreate'

function Home() {
    const [currentData, setCurrentData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPagination, setCurrentPagination] = useState([])
    const [isDataLoading, setIsDataLoading] = useState(true)

    const fetchData = async () => {
        setIsDataLoading(true)

        try {
            const result = await axios.get('/post')
            if (result.status === 200) {
                setCurrentData(result.data)
                setIsDataLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        let items = []

        for (let i = 1; i <= Math.ceil(currentData.length / 5); i++) {
            items.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                    {i}
                </Pagination.Item>
            )
        }

        setCurrentPagination(items)
    }, [currentPage, currentData])

    return (
        <Container className="mt-2 p-3 w-auto" style={{ maxWidth: '700px' }}>
            <PostCreate refresh={fetchData} />

            {currentData.length === 0 ? (
                isDataLoading ? (
                    <Spinner animation="border" role="status" variant="danger" className="fs-5 mx-auto mt-5 d-block" style={{ height: '75px', width: '75px' }}>
                        <span className="visually-hidden">Chargement...</span>
                    </Spinner>
                ) : (
                    <p className="text-center fs-5 mt-5 d-block">Il n'y a rien à afficher ici :c</p>
                )
            ) : (
                currentData.slice((currentPage - 1) * 5, currentPage * 5).map((element) => <Post key={element._id} postId={element._id} refreshData={fetchData} />)
            )}
            {currentData.length > 5 && (
                <Pagination className={currentData.length === 0 ? 'd-none' : 'mt-2 justify-content-center'}>
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                    {currentPagination.length > 1 && currentPagination}
                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(currentData.length / 5)} />
                </Pagination>
            )}
        </Container>
    )
}

export default Home

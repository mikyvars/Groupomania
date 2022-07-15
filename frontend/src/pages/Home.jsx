import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getUserData } from '../services/Authentification'
import { EmojiFrown } from 'react-bootstrap-icons'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
import Alert from 'react-bootstrap/Alert'
import Post from '../components/Post'
import Spinner from 'react-bootstrap/Spinner'

function Home() {
    const [currentData, setCurrentData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPagination, setCurrentPagination] = useState([])
    const [currentError, setCurrentError] = useState("Désolé, le message d'erreur a du se perdre dans le multivers.")
    const [alertVisibility, setAlertVisibility] = useState(false)
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
                    Authorization: `Bearer ${getUserData().token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (result.status === 201) {
                setAlertVisibility(false)
                setCurrentError("Désolé, le message d'erreur a du se perdre dans le multivers.")
                fetchData()
                reset()
            }
        } catch (error) {
            setCurrentError(error.response.data.error)
            setAlertVisibility(true)
        }
    }

    const fetchData = async () => {
        try {
            const result = await axios.get('/post', {
                headers: {
                    Authorization: `Bearer ${getUserData().token}`,
                },
                data: {
                    userId: getUserData().userId,
                },
            })

            if (result.status === 200) {
                // remove timeout before sending to prod
                setTimeout(() => {
                    setCurrentData(result.data)
                }, 1000)
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
        <Container className="mt-4 p-3 w-auto" style={{ maxWidth: '700px' }}>
            <Alert show={alertVisibility} variant="danger" onClose={() => setAlertVisibility(false)} dismissible>
                <Alert.Heading>Oups, une erreur est survenue {<EmojiFrown />}</Alert.Heading>
                <p>{currentError}</p>
            </Alert>

            <Form className="p-3 bg-gprimary rounded-3" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formContent">
                    <Form.FloatingLabel controlId="floatingContent" label="Nouvelle publication...">
                        <Form.Control as="textarea" placeholder="Nouvelle publication..." required {...register('content')} minLength="10" />
                        <Form.Control.Feedback type="invalid">{errors.content && errors.content.message}</Form.Control.Feedback>
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Control type="file" {...register('image')} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Button type="submit">Publier</Button>
                </Form.Group>
            </Form>
            <div>
                {currentData.length === 0 ? (
                    <Spinner animation="border" role="status" variant="danger" className="fs-5 mx-auto mt-5 d-block" style={{ height: '75px', width: '75px' }}>
                        <span className="visually-hidden">Chargement...</span>
                    </Spinner>
                ) : (
                    currentData.slice((currentPage - 1) * 5, currentPage * 5).map((element) => <Post key={element._id} postId={element._id} refreshData={fetchData} />)
                )}
                <Pagination className={currentData.length === 0 ? 'd-none' : 'mt-2 justify-content-center'}>
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                    {currentPagination.length > 1 && currentPagination}
                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(currentData.length / 5)} />
                </Pagination>
            </div>
        </Container>
    )
}

export default Home

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function PostComment({ postData, close }) {
    return (
        <Modal show={true} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Commentaires</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {postData.usersComments.map((element, index) => (
                    <Card key={index}>
                        <Card.Header className="fs-8" style={{ padding: '4px 10px' }}>
                            Publié par ### le {new Date(element.posted).toLocaleDateString('fr-FR')} à {new Date(element.posted).toLocaleTimeString('fr-FR')}
                        </Card.Header>
                        <Card.Body style={{ padding: '10px' }}>{element.content}</Card.Body>
                    </Card>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Form noValidate onSubmit={() => console.log(0)} className="d-flex flex-fill">
                    <Form.Group className="flex-fill me-2">
                        <FloatingLabel controlId="floatingComment" label="Ajouter un commentaire...">
                            <Form.Control type="text" placeholder="Ajouter un commentaire..." />
                        </FloatingLabel>
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

export default PostComment

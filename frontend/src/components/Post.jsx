import Image from 'react-bootstrap/Image'
import { ThreeDotsVertical, HeartFill } from 'react-bootstrap-icons'

function Post({ data }) {
    const { posted, content, imageUrl, usersLiked } = data
    const { firstName, lastName } = data.postedBy
    const dateFormat = new Date(posted).toLocaleDateString('fr-FR')
    const timeFormat = new Date(posted).toLocaleTimeString('fr-FR')

    return (
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
                <div style={{ justifySelf: 'flex-end' }}>
                    <ThreeDotsVertical style={{ cursor: 'pointer' }} />
                </div>
            </div>
            <div className="my-3">
                {content} {imageUrl && <Image src={imageUrl} style={{ height: '300px', width: '100%', objectFit: 'cover' }} />}
            </div>
            <div className="d-flex align-items-center">
                <HeartFill className="fs-5 text-danger" style={{ cursor: 'pointer' }} />
                <p className="fs-7 ms-1">{usersLiked.length}</p>
            </div>
        </article>
    )
}

export default Post

import ModalPost from '../../components/Modals/ModalPost'
import ModalNews from '../../components/Modals/ModalNews'
import * as Style from './style'
import { useState } from 'react'
import axios from 'axios'
import { getUserData } from '../../services/Authentification'
import { useEffect } from 'react'
import moment from 'moment'

function Home() {
    const [currentModal, setCurrentModal] = useState(null)
    const [currentPosts, setCurrentPosts] = useState([])
    const [currentNews, setCurrentNews] = useState([])
    const [profileData, setProfileData] = useState({ firstName: 'John', lastName: 'Doe', grade: 'Employé' })

    const closeModal = () => {
        setCurrentModal(null)
    }

    useEffect(() => {
        axios
            .get('/user/' + getUserData().userId, {
                headers: {
                    Authorization: `Bearer ${getUserData().token}`,
                },
                data: {
                    userId: getUserData().userId,
                },
            })
            .then((result) => {
                setProfileData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

        axios
            .get('/post', {
                headers: {
                    Authorization: `Bearer ${getUserData().token}`,
                },
                data: {
                    userId: getUserData().userId,
                },
            })
            .then((result) => {
                setCurrentPosts(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

        axios
            .get('/news', {
                headers: {
                    Authorization: `Bearer ${getUserData().token}`,
                },
                data: {
                    userId: getUserData().userId,
                },
            })
            .then((result) => {
                setCurrentNews(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <Style.StyledContent>
            <Style.StyledSidebar>
                <Style.StyledSidebarProfile>
                    <img
                        src="/images/avatar.png"
                        alt="Avatar de John Doe"
                        className="profile__avatar"
                    />
                    <div className="profile__identity">
                        <p className="profile__name">{`${profileData.firstName.charAt(0).toUpperCase() + profileData.firstName.slice(1)} ${
                            profileData.lastName.charAt(0).toUpperCase() + profileData.lastName.slice(1)
                        }`}</p>
                        <p className="profile__status">{profileData.grade === 'user' ? 'Employé' : 'Administrateur'}</p>
                    </div>
                </Style.StyledSidebarProfile>
                <Style.StyledSidebarContent>
                    <div className="content__header">
                        <h2 className="content__title">Actualités de l'entreprise</h2>
                        {getUserData().grade === 'admin' && (
                            <button
                                className="content__new"
                                onClick={() => setCurrentModal(<ModalNews closeModal={closeModal} />)}
                            >
                                Nouvelle actualité
                            </button>
                        )}
                    </div>
                    <div className="content__announce">
                        {currentNews.length === 0
                            ? "Il n'y a rien à afficher :c"
                            : currentNews.map((element, index) => {
                                  const date = moment(new Date(element.posted)).format('DD/MM/YYYY')

                                  return (
                                      <div
                                          className="announce"
                                          key={index}
                                      >
                                          <div className="announce__header">
                                              <p className="announce__date">{date}</p>
                                              <p className="announce__title">{element.title}</p>
                                          </div>
                                          <p className="announce__content">{element.content}</p>
                                      </div>
                                  )
                              })}

                        {/* <div className="announce">
                                <div className="announce__header">
                                    <p className="announce__date">04/07/2022</p>
                                    <p className="announce__title">Ratione omnis sollemnitate hiberna discessit.</p>
                                </div>
                                <p className="announce__content">
                                    Uxoresque hastam pacto offert si ex matrimonii et elegerit discessura hastam illis in tempus sit est ad coniunx futura solvitur in species post id marito ex uxoresque
                                    quo incredibile si.
                                </p>
                            </div> */}
                    </div>
                </Style.StyledSidebarContent>
            </Style.StyledSidebar>

            <Style.StyledFeed>
                <div className="feed__header">
                    <h2 className="feed__title">Fil d'actualités</h2>
                    <button
                        className="feed__new"
                        onClick={() => setCurrentModal(<ModalPost closeModal={closeModal} />)}
                    >
                        Nouveau post
                    </button>
                </div>
                <div className="feed__posts">
                    {currentPosts.length === 0
                        ? "Il n'y a rien à afficher :c"
                        : currentPosts.map((element, index) => {
                              return (
                                  <div
                                      className="post"
                                      key={index}
                                  >
                                      <div className="post__header">
                                          <img
                                              src="/images/avatar.png"
                                              alt="Avatar de John Doe"
                                              className="feed__avatar"
                                          />
                                          <div className="post__identity">
                                              <p className="feed__name">{`${element.postedBy.firstName.charAt(0).toUpperCase() + element.postedBy.firstName.slice(1)} ${
                                                  element.postedBy.lastName.charAt(0).toUpperCase() + element.postedBy.lastName.slice(1)
                                              }`}</p>
                                              <p className="feed__status">{element.postedBy.grade === 'user' ? 'Employé' : 'Administrateur'}</p>
                                          </div>
                                      </div>
                                      <div className="post__content">
                                          {element.content}
                                          {element.imageUrl && (
                                              <img
                                                  src={element.imageUrl}
                                                  alt=""
                                              />
                                          )}
                                      </div>
                                      <div className="post__footer">
                                          <i className="fa-solid fa-heart"></i>
                                          <p className="post__likeCount">{element.usersLiked.length}</p>
                                      </div>
                                  </div>
                              )
                          })}
                </div>
                {/* <div className="post">
                        <div className="post__header">
                            <img
                                src="/images/avatar.png"
                                alt="Avatar de John Doe"
                                className="feed__avatar"
                            />
                            <div className="post__identity">
                                <p className="feed__name">John Doe</p>
                                <p className="feed__status">Administrateur</p>
                            </div>
                        </div>
                        <p className="post__content">
                            Quo cognito Constantius ultra mortalem modum exarsit ac nequo casu idem Gallus de futuris incertus agitare quaedam conducentia saluti suae per itinera conaretur, remoti
                            sunt omnes de industria milites agentes in civitatibus perviis.
                        </p>
                        <div className="post__footer">
                            <i className="fa-solid fa-heart"></i>
                            <p className="post__likeCount">69</p>
                        </div>
                    </div> */}
            </Style.StyledFeed>
            {currentModal}
        </Style.StyledContent>
    )
}

export default Home

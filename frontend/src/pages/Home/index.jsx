import * as Style from './style'

function Home() {
    return (
        <Style.StyledContent>
            <Style.StyledSidebar>
                <Style.StyledSidebarProfile>
                    <img src="/images/avatar.png" alt="Avatar de John Doe" className="profile__avatar" />
                    <div className="profile__identity">
                        <p className="profile__name">John Doe</p>
                        <p className="profile__status">Administrateur</p>
                    </div>
                </Style.StyledSidebarProfile>
                <Style.StyledSidebarContent>
                    <h2 className="content__title">Actualités de l'entreprise</h2>
                    <div className="content__announce">
                        <div className="announce">
                            <div className="announce__header">
                                <p className="announce__date">04/07/2022</p>
                                <p className="announce__title">Ratione omnis sollemnitate hiberna discessit.</p>
                            </div>
                            <p className="announce__content">
                                Uxoresque hastam pacto offert si ex matrimonii et elegerit discessura hastam illis in tempus sit est ad coniunx futura solvitur in species post id marito ex uxoresque
                                quo incredibile si.
                            </p>
                        </div>
                        <div className="announce">
                            <div className="announce__header">
                                <p className="announce__date">04/07/2022</p>
                                <p className="announce__title">Ratione omnis sollemnitate hiberna discessit.</p>
                            </div>
                            <p className="announce__content">
                                Uxoresque hastam pacto offert si ex matrimonii et elegerit discessura hastam illis in tempus sit est ad coniunx futura solvitur in species post id marito ex uxoresque
                                quo incredibile si.
                            </p>
                        </div>
                    </div>
                </Style.StyledSidebarContent>
            </Style.StyledSidebar>

            <Style.StyledFeed>
                <h2 className="feed__title">Fil d'actualités</h2>
                <div className="feed__posts">
                    <div className="post">
                        <div className="post__header">
                            <img src="/images/avatar.png" alt="Avatar de John Doe" className="feed__avatar" />
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
                    </div>
                    <div className="post">
                        <div className="post__header">
                            <img src="/images/avatar.png" alt="Avatar de John Doe" className="feed__avatar" />
                            <div className="post__identity">
                                <p className="feed__name">John Doe</p>
                                <p className="feed__status">Administrateur</p>
                            </div>
                        </div>
                        <div className="post__content">
                            <p>
                                Quo cognito Constantius ultra mortalem modum exarsit ac nequo casu idem Gallus de futuris incertus agitare quaedam conducentia saluti suae per itinera conaretur, remoti
                                sunt omnes de industria milites agentes in civitatibus perviis.
                            </p>
                            <img src="/images/background.jpg" alt="" />
                        </div>
                        <div className="post__footer">
                            <i className="fa-solid fa-heart"></i>
                            <p className="post__likeCount">69</p>
                        </div>
                    </div>
                </div>
            </Style.StyledFeed>
        </Style.StyledContent>
    )
}

export default Home

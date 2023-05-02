import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import './UserPage.css';

const UserPage = () => {

    return (
        <div>
            <Header />
            <div className="userPageHeader">
                <div className="userPageImgContainer">
                    <img src="" alt="" />
                </div>
                <div>
                    <div>
                        <h3 className="username">Username</h3>
                    </div>
                    <div className="statsContainer">
                        <div className="stat">
                            <p className="statNumber">30</p>
                            <p className="statKind">Posts</p>
                        </div>
                        <div className="stat">
                            <p className="statNumber">56</p>
                            <p className="statKind">Comments</p>
                        </div>
                        <div className="stat">
                            <p className="statNumber">87</p>
                            <p className="statKind">Likes</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>Description</p>
            </div>
            <Nav />
        </div>
    )
}
 
export default UserPage;
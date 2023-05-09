import { useEffect } from 'react';
import Post from '../Post/Post';
import { useParams } from 'react-router-dom';
import { usePostsContext } from '../../hooks/usePostsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

const UserPageSelectedPost = () => {
    const { user } = useAuthContext();
    const imageUrl = `http://localhost:3001/static/${user.user.filename}`;
    const { posts, dispatch } = usePostsContext();
    const { id } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/post/userposts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if(response.ok) {
                dispatch({type: 'SET_POSTS', payload: json});
            }
        }
    
        if (user) {
            fetchPosts();
        }
        
    }, [dispatch, user, id]);

    console.log(posts);

    return (
        <div>
            <Header />
            <div className="userPageHeader">
                <div className="userPageImgContainer">
                    <img src={imageUrl} alt="" />
                </div>
                <div>
                    <div>
                        <h3 className="username">{user.user.username}</h3>
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
                <p className="userPageDescription">{user.user.description}</p>
            </div>
            <div className="postsUserPage">
                {/* <Post post={post} /> */}
            </div>
            <Nav />
        </div>
    )
}
 
export default UserPageSelectedPost;
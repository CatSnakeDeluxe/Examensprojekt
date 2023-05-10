import { useEffect } from 'react';
import Post from '../Post/Post';
import { Link } from "react-router-dom";
import { usePostsContext } from '../../hooks/usePostsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import './UserPage.css';
import URL from '../../url';

const UserPage = () => {
    const { user } = useAuthContext();
    const imageUrl = `http://localhost:3001/static/${user.user.filename}`;
    const { posts, dispatch } = usePostsContext();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`${URL}/api/post/userposts`, {
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
        
    }, [dispatch, user]);

        const handleDelete = async(id) => {
        const response = await fetch(`${URL}/api/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({type: 'DELETE_POST', payload: json});
        }
    }

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
                {posts && posts.map((post) => (
                    <div key={`div-${post._id}`}>
                        <Post key={post._id} post={post} />
                        <div className="btnContainer" key={`btnContainer-${post._id}`}>
                            <button onClick={() => handleDelete(post._id)} className="deleteBtn" key={`delete-${post._id}`}>Delete</button>
                            <Link to="/userPage/edit"><button className="editBtn" key={`edit-${post._id}`}>Edit</button></Link>
                        </div>
                    </div>
                ))}
            </div>
            <Nav />
        </div>
    )
}
 
export default UserPage;
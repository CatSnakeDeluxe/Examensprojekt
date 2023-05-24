import { useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import Post from '../Post/Post';
import { usePostsContext } from '../../hooks/usePostsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import URL from '../../url';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import './Feed.css';

const Feed = () => {
    // const navigate = useNavigate();
    const { posts, dispatch } = usePostsContext();
    const { user } = useAuthContext();


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`${URL}/api/post`, {
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

    const handleLike = async (id) => {
        const response = await fetch(`${URL}/api/post/${id}/like`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: user.user._id }),
        });

        if (response.ok) {
            const updatedPost = await response.json();
            dispatch({ type: 'EDIT_POST', payload: updatedPost });
        }
    };

    return (
        <div className="feedContainer">
            <Header />
            <div className="feedPosts">
                {posts && posts.map((post) => (
                    <div className="feedUserPosts" key={`div-${post._id}`}>
                        <Post key={post._id} post={post} handleLike={handleLike}/>
                    </div>
                ))}
            </div>
            <Nav />
        </div>
    )
}
 
export default Feed;
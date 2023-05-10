import { useEffect } from 'react';
import Post from '../Post/Post';
import { usePostsContext } from '../../hooks/usePostsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import URL from '../../url';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import './Feed.css';

const Feed = () => {
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
                // setPosts(json);
                dispatch({type: 'SET_POSTS', payload: json});
            }
        }

        if (user) {
            fetchPosts();
        }
        
    }, [dispatch, user]);

    return (
        <div className="feedContainer">
            <Header />
            <div className="posts">
                {posts && posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
            <Nav />
        </div>
    )
}
 
export default Feed;
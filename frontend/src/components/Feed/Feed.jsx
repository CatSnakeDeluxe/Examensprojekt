import { useEffect } from 'react';
import Post from '../Post/Post';
import { usePostsContext } from '../../hooks/usePostsContext';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import './Feed.css';

const Feed = () => {
    const { posts, dispatch } = usePostsContext();
    // const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/post');
            const json = await response.json();

            if(response.ok) {
                // setPosts(json);
                dispatch({type: 'SET_POSTS', payload: json});
            }
        }

        fetchPosts();
    }, []);

    return (
        <div className="feedContainer">
            <Header />
            <h2>Feed</h2>
            <div className='posts'>
                {posts && posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
            <Nav />
        </div>
    )
}
 
export default Feed;
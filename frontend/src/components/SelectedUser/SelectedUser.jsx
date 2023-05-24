import { useState, useEffect } from 'react';
import Post from '../Post/Post';
import { useParams } from "react-router-dom";
import { usePostsContext } from '../../hooks/usePostsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import URL from '../../url';

const SelectedUser = () => {
    const { user } = useAuthContext();
    const { userId } = useParams();
    const [selectedUser, setSelectedUser] = useState(null);
    const { posts, dispatch } = usePostsContext();
    const [totalLikes, setTotalLikes] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [userResponse, postsResponse] = await Promise.all([
            fetch(`${URL}/api/user/${userId}`, {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            }),
            fetch(`${URL}/api/post/userposts/selecteduser/${userId}`, {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            })
          ]);
  
          if (!userResponse.ok || !postsResponse.ok) {
            throw new Error('Failed to fetch data');
          }
  
          const userData = await userResponse.json();
          const postsData = await postsResponse.json();
  
          setSelectedUser(userData);
          dispatch({ type: 'SET_POSTS', payload: postsData });
        } catch (error) {
          console.error(error);
        }
      };
  
      if (user && userId) {
        fetchData();
      }
    }, [user, userId, dispatch]);
  
    useEffect(() => {
      // Calculate total likes
      if (posts) {
        const likes = posts.reduce((total, post) => total + post.like.length, 0);
        setTotalLikes(likes);
      }
    }, [posts]);
  
    const handleLike = async (id) => {
      // Implementation for handleLike function
    };
  
    const postCount = posts ? posts.length : 0;
  
    if (!selectedUser) {
      return <div>Loading...</div>;
    }
  
    const imageUrl = `${URL}/static/${selectedUser.filename}`;

    return (
        <div>
            <Header />
            <div className="userPageHeader">
                <div className="userPageImgContainer">
                    <img src={imageUrl} alt="" />
                </div>
                <div>
                    <div>
                        <h3 className="username">{selectedUser.username}</h3>
                    </div>
                    <div className="statsContainer">
                        <div className="stat">
                            <p className="statNumber">{postCount}</p>
                            <p className="statKind">Posts</p>
                        </div>
                        <div className="stat">
                            <p className="statNumber">0</p>
                            <p className="statKind">Comments</p>
                        </div>
                        <div className="stat">
                            <p className="statNumber">{totalLikes}</p>
                            <p className="statKind">Likes</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="userPageDescription">{selectedUser.description}</p>
            </div>
            <div className="postsUserPage">
                {posts && posts.map((post) => (
                    <div className="userPosts" key={`div-${post._id}`}>
                        <Post key={post._id} post={post} handleLike={handleLike} />
                    </div>
                ))}
            </div>
            <Nav />
        </div>
    );
};
 
export default SelectedUser;
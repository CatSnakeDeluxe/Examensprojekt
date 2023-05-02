import { usePostsContext } from '../../hooks/usePostsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Post.css';

const Post = ({ post }) => {
    const { dispatch } = usePostsContext();
    const { user } = useAuthContext();

    const handleDelete = async() => {
        if (!user) {
            return;
        }

        const response = await fetch('/api/protected/post/' + post._id, {
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

    const imageUrl = `http://localhost:3001/static/${post.filename}`;
    // const imageUrl = `../../../../backend/public/uploads/posts/${post.filename}`;

    return (
        <div className="post">
            <div className="postHeader">
                <div>
                    <div className="userContainer">
                        <div className="userImgContainer">
                            <img src={imageUrl} alt="userImage" />
                        </div>
                        <h4>Username</h4>
                    </div>
                </div>
                <div>
                    <p>{post.createdAt}</p>
                </div>
            </div>
            <div className="postImgContainer">
                <img src={imageUrl} alt="postImage" />
            </div>
            <div className="iconsContainer">
                <div className="likesContainer">
                    <i className="fa-regular fa-heart"></i>
                    <p className="likes">3</p>
                </div>
                <div>
                    <i className="fa-regular fa-bookmark"></i>
                    <i className="fa-regular fa-message"></i>
                </div>
            </div>
            <div className="descriptionContainer">
                <p>{post.description}</p>
                <p className="hashtags">{post.hashtags}</p>
            </div>
            {/* <span onClick={handleDelete}>Delete</span> */}
        </div>
    )
}
 
export default Post;
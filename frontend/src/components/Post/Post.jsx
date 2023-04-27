import { usePostsContext } from '../../hooks/usePostsContext';
import { useAuthContext } from '../../hooks/useAuthContext';

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

    return (
        <div className="post">
            <h4>{post.title}</h4>
            <p>{post.createdAt}</p>
            <span onClick={handleDelete}>Delete</span>
        </div>
    )
}
 
export default Post;
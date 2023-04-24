import { usePostsContext } from '../../hooks/usePostsContext';

const Post = ({ post }) => {
    const { dispatch } = usePostsContext();

    const handleDelete = async() => {
        const response = await fetch('/api/post/' + post._id, {
            method: 'DELETE'
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
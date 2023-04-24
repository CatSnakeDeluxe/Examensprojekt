import { useState } from "react";
import { usePostsContext } from "../../hooks/usePostsContext";

const PostForm = () => {
    const { dispatch } = usePostsContext;
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const post = {title};

        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setTitle('');
            setError(null);
            console.log('New Post Added', json);
            dispatch({type: 'CREATE_POST', payload: json});
        }
    }

    return (
        <form className="createPostForm" onSubmit={handleSubmit}>
            <h3>Add Post</h3>
            <input type="text" onChange={(e) => setTitle(e.target.value)}/>
            <button>Create Post</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default PostForm;
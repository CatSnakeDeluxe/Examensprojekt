import { useState } from "react";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

const PostForm = () => {
    const { dispatch } = usePostsContext();
    const { user } = useAuthContext();
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            return;
        }

        const post = {title};

        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
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
        <div>
            <Header />
            <form className="createPostForm" onSubmit={handleSubmit}>
                <h2>Add Post</h2>
                {/* <input type="text" onChange={(e) => setTitle(e.target.value)} className={emptyFields.includes('title') ? 'error' : ''}/> */}
                <input type="text" onChange={(e) => setTitle(e.target.value)}/>
                <button>Create Post</button>
                {error && <div className="error">{error}</div>}
            </form>
            <Nav />
        </div>
    )
}

export default PostForm;
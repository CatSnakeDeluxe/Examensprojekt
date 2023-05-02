import { useState } from "react";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

const PostForm = () => {
    const navigate = useNavigate();
    
    const { dispatch } = usePostsContext();
    const { user } = useAuthContext();
    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [file, setFile] = useState('');
    const [error, setError] = useState(null);

    const formData = new FormData();
    if (description) formData.append('description', description);
    if (hashtags) formData.append('hashtags', hashtags);
    if (file) formData.append('file', file);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            return;
        }

        const response = await fetch('/api/post', {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            // setTitle('');
            setError(null);
            console.log('New Post Added', json);
            dispatch({type: 'CREATE_POST', payload: json});
            navigate("/");
        }
    }

    return (
        <div>
            <Header />
            <form className="createPostForm" onSubmit={handleSubmit}>
                <h2>Add Post</h2>
                <input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input type="textarea" value={hashtags} onChange={(e) => setHashtags(e.target.value)}/>
                <label className="custom-file-upload">
                    {/* <input type="file" name="file" value={fileName} onChange={(e) => setFileName(e.target.files[0])}/> */}
                    <input type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
                    Upload Picture
                </label>
                <button>Create Post</button>
                {error && <div className="error">{error}</div>}
            </form>
            <Nav />
        </div>
    )
}

export default PostForm;
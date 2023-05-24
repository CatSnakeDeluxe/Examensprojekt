import { useState, useEffect } from "react";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import URL from '../../url';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import './EditForm.css';

const EditForm = () => {
    const navigate = useNavigate();
    const { dispatch } = usePostsContext();
    const { user } = useAuthContext();

    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);

    const formData = new FormData();
    if (description) formData.append('description', description);
    if (hashtags) formData.append('hashtags', hashtags);
    if (file) formData.append('file', file);

    useEffect(() => {
        if (file) {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            setPreview(reader.result);
          };
    
          reader.readAsDataURL(file);
        }
      }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            return;
        }

        if (!description) {
            setError('Description required');
            return;
        }

        if (!hashtags) {
            setError('Atleast on hashtag required');
            return;
        }

        if (!file) {
            setError('Image required');
            return;
        }

        const response = await fetch(`${URL}/api/post/userposts/${id}`, {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setError(null);
            dispatch({type: 'EDIT_POST', payload: json});
            navigate("/userPage");
        }
    }

    const { id } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`${URL}/api/post/userposts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                setFile(json.file);
                setDescription(json.description);
                setHashtags(json.hashtags);
                setPreview(`${URL}/static/${json.filename}`);

                console.log(json.filename);
            } else {
                // Handle error case
                setError('Failed to fetch post data');
            }
        }
    
        if (user) {
            fetchPosts();
        }
    
    }, [dispatch, id, user]);

    console.log('file', file);

    return (
        <div>
            <Header />
            <form className="editPostForm" onSubmit={handleSubmit}>
                <h2>Edit Post</h2>
                <label className="custom-file-upload">
                    <input type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                    Upload Picture
                </label>
                <p className="uploadFilename">{ file }</p>
                {/* <p className="uploadFilename">{file.filename}</p> */}
                {preview && 
                <div className="previewImage">
                    <img src={preview} alt="Preview" />
                </div>
                }
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a description"/>
                <input type="text" value={hashtags} onChange={(e) => setHashtags(e.target.value)} 
                    placeholder="Add hashtags"/>
                <input className="gradientText" type="submit" value="Save Changes" />
                {error && <div className="error">{error}</div>}
            </form>
            <Nav />
        </div>
    )
}

export default EditForm;
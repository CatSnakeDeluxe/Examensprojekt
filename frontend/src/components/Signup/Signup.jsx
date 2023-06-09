import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { v4 as uuidv4 } from 'uuid';
import './Signup.css';
import { useState } from "react";

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [error, setError] = useState(null);

    const formData = new FormData();
    if (email) formData.append('email', email);
    if (username) formData.append('username', username);
    if (password) formData.append('password', password);
    if (description) formData.append('description', description);
    if (file) {
        const newFilename = uuidv4() + file.name;
        const modifiedFile = new File([file], newFilename, { type: file.type });
        formData.append('file', modifiedFile);
    }

    const { signup } = useSignup();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!email) {
            setError("Email required");
            return
        }

        if (!username) {
            setError("Username required");
            return
        }

        if (!password) {
            setError("Password required");
            return
        }

        if (!description) {
            setError("Description required");
            return
        }

        if (!file) {
            setError("Profile Picture required ( .jpg )");
            return
        }

        // await signup(email, username, password, fileName);
        await signup(formData);

        navigate("/login");
    }

    return (
        <div className="registerContainer">
            <h1 className="gradientText">Postr</h1>
            <form className="registerForm" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Register</h2>
                <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="text" name="username" id="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <textarea rows="2" name="description" id="description" placeholder="Write something about yourself..." value={description} onChange={e => setDescription(e.target.value)}/>
                <label className="custom-file-upload">
                    {/* <input type="file" name="file" value={fileName} onChange={(e) => setFileName(e.target.files[0])}/> */}
                    <input type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
                    Upload Profile Picture
                </label>
                <p className="uploadFilename">{file.name}</p>
                <input className="gradientText" type="submit" value="Register" />  
                {error && <div className="error">{error}</div>}
            </form>
            
            <p className="loginRegisterLink">Already a user?<Link className="link gradientText" to="/login">Login</Link></p>
        </div>
    )
}

export default Signup;
import { Link, useNavigate } from "react-router-dom";
import './Register.css';
import { useState } from "react";

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = { email, username, password };

        const response = await fetch('/api/register', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setError(null);
            console.log('New User Added', json);
            navigate("/login");
        }
    }

    return (
        <div className="registerContainer">
            <h1 className="gradientText">Postr</h1>
            <form className="registerForm" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="text" name="username" id="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <label className="custom-file-upload">
                    <input type="file" name="file"/>
                    Upload Profile Picture
                </label>
                <input className="gradientText" type="submit" value="Register" />  
                {error && <div className="error">{error}</div>}
            </form>
            
            <p className="loginRegisterLink">Already a user?<Link className="link gradientText" to="/login">Login</Link></p>
        </div>
    )
}

export default Register;
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Login.css';

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = { username, password };

        const response = await fetch('/api/user/login', {
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
            console.log('Logged in', json);
            navigate("/");
        }
    }

    return (
        <div className="loginContainer">
            <h1 className="gradientText">Postr</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" name="username" id="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <input className="gradientText" type="submit" value="Login" />
                {error && <div className="error">{error}</div>}
            </form>
            <p className="loginRegisterLink">Not a user yet?<Link className="link gradientText" to="/register">Register</Link></p>
        </div>
    )
}
 
export default Login;
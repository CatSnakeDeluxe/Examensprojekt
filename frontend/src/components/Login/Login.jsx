import { Link } from "react-router-dom";
import './Login.css';

const Login = () => {
    return (
        <div>
            <h1 className="gradientText">Postr</h1>
            <h2>Login</h2>
            <form className="loginForm" action="">
                <input type="text" name="username" id="username" placeholder="Username"/>
                <input type="password" name="password" id="password" placeholder="Password" />
                <input className="gradientText" type="submit" value="Login" />
                <p className="loginRegisterLink">Not a user yet?<Link className="link gradientText" to="/register">Register</Link></p>
            </form>
        </div>
    )
}
 
export default Login;
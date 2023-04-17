import { Link } from "react-router-dom";
import './Register.css';

const Register = () => {
    return (
        <div>
            <h1 className="gradientText">Postr</h1>
            <h2>Register</h2>
            <form className="registerForm" action="">
                <input type="email" name="email" id="email" placeholder="Email"/>
                <input type="text" name="username" id="username" placeholder="Username"/>
                <input type="password" name="password" id="password" placeholder="Password" />
                <label class="custom-file-upload">
                    <input type="file"/>
                    Upload Profile Picture
                </label>
                <input className="gradientText" type="submit" value="Register" />
                <p className="loginRegisterLink">Already a user?<Link className="link gradientText" to="/login">Login</Link></p>
            </form>
        </div>
    )
}
 
export default Register;
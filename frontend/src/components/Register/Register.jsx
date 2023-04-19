import { Link } from "react-router-dom";
import './Register.css';
import { useState } from "react";

const Register = () => {
    const [formValue, setFormValue] = useState({ email:'', username:'', password:''});

    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]:value});
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        const inputValues = { email: formValue.email, username: formValue.username, password: formValue.password}

        let res = await fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(inputValues)
        });
    }
    return (
        <div className="registerContainer">
            <h1 className="gradientText">Postr</h1>
            <form className="registerForm" onSubmit={handleRegister}>
                <h2>Register</h2>
                <input type="email" name="email" id="email" placeholder="Email" value={formValue.email} onChange={handleInput}/>
                <input type="text" name="username" id="username" placeholder="Username" value={formValue.username} onChange={handleInput}/>
                <input type="password" name="password" id="password" placeholder="Password" value={formValue.password} onChange={handleInput}/>
                <label className="custom-file-upload">
                    <input type="file"/>
                    Upload Profile Picture
                </label>
                <input className="gradientText" type="submit" value="Register" />  
            </form>
            <p className="loginRegisterLink">Already a user?<Link className="link gradientText" to="/login">Login</Link></p>
        </div>
    )
}

export default Register;
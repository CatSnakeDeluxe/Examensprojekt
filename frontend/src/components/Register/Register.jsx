import { Link } from "react-router-dom";
import './Register.css';
import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { email, username, password };

        fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
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

// import React, { useState } from 'react';

// function DemoForm() {
// const [name, setName] = useState('');
// const [email, setEmail] = useState('');
// const [message, setMessage] = useState('');

// const handleSubmit = (e) => {
// e.preventDefault();
// const data = { name, email, message };
// fetch('http://localhost:3001/demo', {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json'
// },
// body: JSON.stringify(data)
// })
// .then(response => response.json())
// .then(data => {
// console.log('Success:', data);
// })
// .catch((error) => {
// console.error('Error:', error);
// });
// }

// return (
// <form onSubmit={handleSubmit}>
// <label>
// Name:
// <input type="text" value={name} onChange={e => setName(e.target.value)} />
// </label>
// <label>
// Email:
// <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
// </label>
// <label>
// Message:
// <textarea value={message} onChange={e => setMessage(e.target.value)} />
// </label>
// <button type="submit">Submit</button>
// </form>
// );
// }

// export default DemoForm;
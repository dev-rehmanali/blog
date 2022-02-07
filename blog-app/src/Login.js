import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        
        e.preventDefault();
        const login = { email, password};

        fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(login)
        })
        .then(res => res.json())
        .then((data) => {

            // console.log(data); 
            localStorage.setItem("token", data.token);
            console.log(data.user);
            localStorage.setItem("userId", data.user._id);
            localStorage.setItem("userName", data.user.name);
            
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
        })


    }

    return (
        <div className="login">
        <h2>Login to Blog</h2>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value) }
            />

        <button 
            type="submit"
        >Login</button>
        <button><Link className="links" to="/signup">Register</Link></button>
        </form>
    </div>
    );

}

export default Login;
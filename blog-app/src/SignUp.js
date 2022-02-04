import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        
        e.preventDefault();
        const login = { name, email, password};

        fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(login)
        })
        .then((res) => {
            res.json(); 
        })
        .then((data) => {
            console.log(data);
            navigate('/'); 
        })
        .catch((error) => {
            console.log(error);
        })


    }



    return (
        <div className="signup">
            <h2>Signup to Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                />
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
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* <label>Picture</label>
                <input
                    type="file"
                    required
                /> */}


                <button><Link className="links" to="/login">LogIn</Link></button>
                <button>Signup</button>
            </form>
        </div>
    );

}

export default SignUp;
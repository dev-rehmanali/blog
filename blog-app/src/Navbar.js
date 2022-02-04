import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/')
    }

    return (
        <nav className='navbar'>
            <h1 className='logo'> Blog App</h1>
            
            {localStorage.getItem('token') ?
            <div className='links'>
                <Link to="/">Home</Link>
                <Link to="/create">Create Blog</Link>
                <Link to="/login"
                onClick={handleLogOut}
                >LogOut</Link>
            </div> 
            :
            <div className='links'>
                <Link to="/login">LogIn</Link>
                <Link to="/signup">SignUp</Link>
            </div> 
}
        </nav>
    );
}

export default Navbar;
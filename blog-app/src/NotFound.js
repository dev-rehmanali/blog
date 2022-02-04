import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <div className='notfound'>
            <h2>404 Eror</h2>
            <p>We cannot find that page</p>
            <Link to="/">Take me back to Home</Link>
        </div>
    );
}

export default NotFound;
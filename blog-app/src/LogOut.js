import { useNavigate } from "react-router-dom";

const LogOut = () => {

    const navigate = useNavigate();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    sessionStorage.clear();
    // navigate('/')
    return ( 

        navigate('/login')

    );


};

export default LogOut;
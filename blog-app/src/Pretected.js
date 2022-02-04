import { Navigate } from 'react-router-dom'

const Protected = (props) => {
    const token = localStorage.getItem('token');

    const Component = props.Component;
    if (token){
        return <Component />
    }
    return  <Navigate to={{ pathname: '/login' }} />

};

export default Protected;
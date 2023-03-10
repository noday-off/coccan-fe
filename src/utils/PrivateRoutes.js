import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {
    const {auth} = useContext(AuthContext);
    let authcheck = localStorage.getItem('jwt');
    //authcheck.token = true;
    return(
        authcheck ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
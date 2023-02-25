import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {
    const {auth} = useContext(AuthContext);
    let authcheck = {'token': auth.accessToken != null};
    //authcheck.token = true;
    return(
        authcheck.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
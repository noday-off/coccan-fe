// import { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = () => {
    const {auth} = useAuth();
    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
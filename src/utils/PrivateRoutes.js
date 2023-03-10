import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    return(
        localStorage.getItem('isLoggedIn') ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
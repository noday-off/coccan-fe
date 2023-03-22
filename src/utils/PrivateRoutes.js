import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    return(
        localStorage.getItem('jwt') ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
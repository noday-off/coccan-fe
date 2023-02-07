import { Outlet, Navigate } from 'react-router-dom';
import {auth} from "../components/googleAuth/firebase";

const PrivateRoutes = () => {
    // let auth = {'token': localStorage.getItem('email') != null};
    let authcheck = {'token': auth.currentUser != null};
    console.log(auth.currentUser);
    return(
        authcheck.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
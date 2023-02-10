import { Outlet, Navigate } from 'react-router-dom';
import {auth} from "../components/googleAuth/firebase";

const PrivateRoutes = () => {
    // let auth = {'token': auth.currentUser != null};
    let authcheck = {'token': localStorage.getItem('email') != null};
    console.log(auth.currentUser);
    return(
        authcheck.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
import "./login.scss";
import {auth,provider} from "../../components/googleAuth/firebase";
import { signInWithPopup } from "firebase/auth";
import React, {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [value,setValue] = useState('');
    const navigate = useNavigate();
    //const {dispatch} = useContext(AuthContext);

    localStorage.clear();

    const handleLogin = async () => {
        signInWithPopup(auth,provider).then((res) => {
          
          if(res.user.email == 'thinn2002@gmail.com'){
            localStorage.setItem("email", res.user.email);
            navigate('/');
          }
          console.log(res);
        }).catch((error) => {
          console.log(error.message);
        })
    }

    useEffect(()=>{
      setValue(localStorage.getItem('email'))
    })


    return (
        <div className="login">
          <div className="login-form">
            <button onClick={handleLogin}>Signin with Google</button>
          </div>
        </div>
    )
};

export default Login;
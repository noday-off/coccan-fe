import "./login.scss";
import {auth,provider} from "../../components/googleAuth/firebase";
import { signInWithPopup } from "firebase/auth";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [value,setValue] = useState('');
    const navigate = useNavigate();

    localStorage.clear();

    const handleLogin = () => {
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

    // useEffect(()=>{
    //   setValue(localStorage.getItem('email'))
    // })

    return (
        <div className="login">
          <div className="login-form">
            <button onClick={handleLogin}>Sign in with Google</button>
          </div>
        </div>
    )
};

export default Login;
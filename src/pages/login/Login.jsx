import "./login.scss";
import {auth,provider} from "../../components/googleAuth/firebase";
import { signInWithPopup } from "firebase/auth";
import { Avatar } from '@mui/material';
import React, {useState} from "react";
import axios from '../../api/axios';
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const {setAuth} = useAuth();
    localStorage.clear();

    const handleLogin = async () => {
      signInWithPopup(auth,provider).then((res) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };
        
        auth.currentUser.getIdTokenResult().then((res)=>{
          myHeaders.append("authentication",res.token);
          console.log(res.token);
          fetch("https://coccan-api20230202190409.azurewebsites.net/api/Auth", requestOptions)
          .then(response => response.json())
          .then((result) => {
            console.log(result);
            if(result.token){
              const accessToken = result.token;
              setAuth({accessToken});
              navigate('/');
            }
          })
          .catch(error => console.log('error', error));
        });
        
        console.log(res);
      }).catch((error) => {
        console.log(error.message);
      })
    }

    return (
        <div className="login">
          <div className="login-form">
            <div className="login-logo">
              <Avatar src="https://icon-library.com/images/sign-in-with-google-icon/sign-in-with-google-icon-16.jpg"
                      sx={{width:50, height:50}}
              />
            </div>
            <button onClick={handleLogin}>Sign in with Google</button>
          </div>
        </div>
    )
};

export default Login;
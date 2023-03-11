import "./login.scss";
import {auth,provider} from "../../components/googleAuth/firebase";
import { signInWithPopup } from "firebase/auth";
import { Avatar } from '@mui/material';
import React, {useEffect, useState} from "react";
import axios from '../../api/axios';
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
		const navigate = useNavigate();
		const {setAuth} = useAuth();
		const [error,setError] = useState("");

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
				console.log('Authenticating...');
				
				auth.currentUser.getIdTokenResult().then((res)=>{
					myHeaders.append("authentication",res.token);
					fetch(`${process.env.REACT_APP_API_KEY}/Auth`, requestOptions)
					.then(response => {
						if(!response.ok){
							toast.error("Fail to log in! Please try again.");
						}
						return response.json()
					})
					.then((result) => {
						if(result.token){
							const accessToken = result.token;
							// setAuth({accessToken});

							//Decode token
							if (jwt(accessToken).role === "ADMIN") {
								//set token into local storage
								localStorage.setItem('jwt',accessToken);
								localStorage.setItem('isLoggedIn',true);
								navigate('/');
								console.log('Complete');
							}
							else {
								toast.error("Account role is not allowed!");
								console.log("Account not allowed");
								setError("Your account is not allowed to login")
							}
						}
					})
					.catch(error => console.log('error', error));
				});
				
			}).catch((error) => {
				console.log(error.message);
			})
		}

		return (
		<>
				<div className="login">
					<div className="login-form">
						<div className="login-logo">
							<Avatar src="https://icon-library.com/images/sign-in-with-google-icon/sign-in-with-google-icon-16.jpg"
											sx={{width:50, height:50}}
							/>
						</div>
						<button onClick={handleLogin}>Sign in with Google</button>
						<div className="error-message">
							{error}
						</div>
					</div>
					<ToastContainer/>
				</div>
		</>
		)
};

export default Login;
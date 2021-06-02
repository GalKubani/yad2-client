import React, { useState } from "react";
import LoginForm from "./loginForm";
import SubscribeForm from "./subscribe";


const LoginPage = (props) => {
	const errorMessage=props.location.state?.needToLogin?"You must login!":""
	const [isLoginMode,setIsLoginMode]=useState(true)
	return (
		<div className="login-page">
			<div className="login-page__form">
				{ isLoginMode?
				<LoginForm errorMessage={errorMessage} setIsLoginMode={setIsLoginMode} />:
				<SubscribeForm  setIsLoginMode={setIsLoginMode}/>}
			</div>
		</div>
	);
};

export default LoginPage;
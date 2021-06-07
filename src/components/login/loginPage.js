import React, { useState } from "react";
import LoginForm from "./loginForm";
import SubscribeForm from "./subscribe";


const LoginPage = ({ onLoginClick }) => {
	const [isLoginMode, setIsLoginMode] = useState(true)



	const closeModal = () => {
		onLoginClick()
	}
	return (
		<div className="modal-container modal-active">
			<div className="modal-right-display">
				<div className="welcome-container">
					<img data-v-43c22490="" src="https://y2-address-master-dev.s3-eu-west-1.amazonaws.com/auth/New_logo_negative.svg" />
					<h1 data-v-43c22490="">ברוכים הבאים לאתר יד2</h1>
					<h4 data-v-43c22490="">טוב לראות אותך שוב!</h4>
				</div>
				<img className="coach" src="https://y2-address-master-dev.s3-eu-west-1.amazonaws.com/auth/couch_lamp.svg" />
			</div>
			<div className="login-modal">
				{isLoginMode ?
					<LoginForm setIsLoginMode={setIsLoginMode} /> :
					<SubscribeForm setIsLoginMode={setIsLoginMode} />}
				<button onClick={closeModal} className="close">X</button>
			</div>

		</div>
	);
};

export default LoginPage;
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
					<img alt="לוגו יד2" src="https://y2-address-master-dev.s3-eu-west-1.amazonaws.com/auth/New_logo_negative.svg" />
					<h1>ברוכים הבאים לאתר יד2</h1>
					<h4>טוב לראות אותך שוב!</h4>
				</div>
				<img alt="ספה יד2" className="coach" src="https://y2-address-master-dev.s3-eu-west-1.amazonaws.com/auth/couch_lamp.svg" />
			</div>
			<div className="login-modal">
				{isLoginMode ?
					<LoginForm closeModal={closeModal} setIsLoginMode={setIsLoginMode} /> :
					<SubscribeForm closeModal={closeModal} setIsLoginMode={setIsLoginMode} />}
				<button onClick={closeModal} className="close">X</button>
			</div>

		</div>
	);
};

export default LoginPage;
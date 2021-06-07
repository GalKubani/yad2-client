import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../actions/loginActions";
import { LoginContext } from "../../context/LoginContext";
import { saveUserOnCookie } from "../../cookies/cookies";
import { loginToDB } from "../../server/db";

const LoginForm = ({ setIsLoginMode }) => {
    const { loginDispatch } = useContext(LoginContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isEmailInputValid, setIsEmailValid] = useState(true)
    const [isPasswordInputValid, setIsPasswordValid] = useState(true)
    const [isFormValid, setIsFormValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

    const history = useHistory()

    const onBlueEmailInput = (e) => {
        const emailValue = e.target.value.trim();
        setEmail(emailValue);
        if (emailValue === "") {
            setIsEmailValid(false)
            setErrorMessage("שדה חובה")
            e.target.classList.remove("valid-input")
            e.target.classList.add("invalid-input")
        }
        // else if(emailValue){

        // }
        else {
            setIsEmailValid(true)
            e.target.classList.remove("invalid-input")
            e.target.classList.add("valid-input")
            if (isPasswordInputValid) { setIsFormValid(true) }
        }
    }
    const onBluePasswordInput = (e) => {
        const passwordValue = e.target.value.trim();
        setPassword(passwordValue);
        if (passwordValue === "") {
            setIsPasswordValid(false)
            setPasswordErrorMessage("שדה חובה")
            e.target.classList.remove("valid-input")
            e.target.classList.add("invalid-input")
        }
        else {
            setIsPasswordValid(true)
            e.target.classList.remove("invalid-input")
            e.target.classList.add("valid-input")
            if (isEmailInputValid) { setIsFormValid(true) }
        }

    }
    const onSubmitForm = async (event) => {
        event.preventDefault()
        console.log("login form!", email, password)
        try {
            await loginToDB(email, password).then(
                (userData) => {
                    if (userData) {
                        saveUserOnCookie(userData)
                        loginDispatch(loginUser(userData, userData.data.token))
                        history.push("/")
                    }
                })
        } catch (err) {
            if (err.message === "Error: Request failed with status code 404") {
                setIsEmailValid(false)
                setErrorMessage("Email not found")
            }
            else if (err.message === "Error: Request failed with status code 400") {
                setIsPasswordValid(false)
                setErrorMessage("Invalid password")
            }
        }
    }
    const isFormInvalid = () => {
        return !isFormValid
    }
    const onClickSubscribe = () => {
        setIsLoginMode(false);
    }
    return (
        <div className="login-wrapper">
            <div className="header-login">
                <h3>התחברות</h3>
                <p>הזן את הפרטים כדי להתחבר</p>
            </div>
            <form className="login-form" onSubmit={onSubmitForm}>
                <div className="input-wrapper">
                    <div className="i-container">
                        <div className="input-title"><label>כתובת מייל</label></div>
                        <input className="login-form-input" placeholder="your@mail.com" onBlur={onBlueEmailInput} autoComplete="on" />
                        {!isEmailInputValid && <div className="invalid-message">{errorMessage}</div>}
                    </div>
                    <div className="i-container">
                        <div className="input-title"><label>סיסמה</label></div>
                        <input className="login-form-input" type="password" placeholder="הקלד סיסמה" onBlur={onBluePasswordInput} />
                        {!isPasswordInputValid && <div className="invalid-message">{passwordErrorMessage}</div>}
                    </div>
                </div>
                <div className="login-form-button">
                    <button className="submit-form-button" type="submit" disabled={isFormInvalid()}>התחבר</button>
                    <div >לא רשום? <span className="change-mode" onClick={onClickSubscribe}>להרשמה</span></div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
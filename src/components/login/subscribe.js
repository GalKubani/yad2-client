import React, { useContext, useState } from 'react';
import validator from 'validator';
import { loginUser } from '../../actions/loginActions';
import { LoginContext } from '../../context/LoginContext';
import { subscribeToSite } from '../../server/db';
import { saveUserOnCookie } from '../../cookies/cookies'

const SubscribeForm = ({ closeModal, setIsLoginMode }) => {
    const { loginDispatch } = useContext(LoginContext);

    const [isEmailInputValid, setIsEmailValid] = useState(true)
    const [isPasswordInputValid, setIsPasswordValid] = useState(true)
    const [isRepeatPasswordInputValid, setIsRepeatPasswordInputValid] = useState(true)

    const [isFormValid, setIsFormValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [passwordRepeatErrorMessage, setPasswordRepeatErrorMessage] = useState("")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onBlueEmailInput = (e) => {
        const emailValue = e.target.value.trim();
        setEmail(emailValue);
        if (emailValue === "" || !validator.isEmail(emailValue)) {
            setIsEmailValid(false)
            if (emailValue !== "") { setErrorMessage("אימייל לא תקין") }
            else { setErrorMessage("שדה חובה") }
            e.target.classList.remove("valid-input")
            e.target.classList.add("invalid-input")
            setIsFormValid(false)
        }
        else {
            setIsEmailValid(true)
            e.target.classList.remove("invalid-input")
            e.target.classList.add("valid-input")
            if (checkIfFormValid()) { setIsFormValid(true) }
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
            setIsFormValid(false)
        }
        else {
            setIsPasswordValid(true)
            e.target.classList.remove("invalid-input")
            e.target.classList.add("valid-input")
            if (checkIfFormValid()) { setIsFormValid(true) }
        }

    }
    const onBluePasswordInputRepeat = (e) => {
        const passwordValue = e.target.value.trim();
        setPassword(passwordValue);
        if (passwordValue === "" || passwordValue !== password) {
            setIsRepeatPasswordInputValid(false)
            e.target.classList.remove("valid-input")
            e.target.classList.add("invalid-input")
            if (passwordValue !== password) { setPasswordRepeatErrorMessage("הסיסמאות אינן זהות") }
            else { setPasswordRepeatErrorMessage("שדה חובה") }
            setIsFormValid(false)
        }
        else if (passwordValue === password) {
            setIsRepeatPasswordInputValid(true)
            e.target.classList.remove("invalid-input")
            e.target.classList.add("valid-input")
            if (checkIfFormValid()) { setIsFormValid(true) }
        }

    }
    const isFormInvalid = () => {
        return !isFormValid
    }
    const checkIfFormValid = () => {
        return isEmailInputValid && isPasswordInputValid && isRepeatPasswordInputValid && password !== ""
    }
    const onSubscribe = async (event) => {

        try {
            await subscribeToSite(email, password).then(
                (userData) => {
                    loginDispatch(loginUser(userData));
                    saveUserOnCookie(userData)
                    closeModal()
                },
                (err) => {
                    if (err.message === "EMAIL_EXISTS") {
                        setIsEmailValid(false)
                        setIsFormValid(false)
                        setErrorMessage("מייל קיים במערכת")
                    }
                }
            );
        } catch (err) {
            event.preventDefault();
            console.log(err)
        }

    };

    const onClickLogin = () => {
        setIsLoginMode(true);
    };

    return (
        <div className="login-wrapper">
            <div className="header-login">
                <h3>הרשמה</h3>
                <p>הזן את הפרטים כדי להרשם</p>
            </div>
            <form className="login-form" onSubmit={onSubscribe}>
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
                    <div className="i-container">
                        <div className="input-title"></div>
                        <input className="login-form-input" type="password" placeholder="חזור על הסיסמה שהקלדת" onBlur={onBluePasswordInputRepeat} />
                        {!isRepeatPasswordInputValid && <div className="invalid-message">{passwordRepeatErrorMessage}</div>}
                    </div>
                </div>
                <div className="login-form-button">
                    <button className="submit-form-button" type="submit" disabled={isFormInvalid()}>הרשם</button>
                    <div >כבר רשום? <span className="change-mode" onClick={onClickLogin}>להתחברות</span></div>
                </div>
            </form>
        </div>
    );
};

export default SubscribeForm;
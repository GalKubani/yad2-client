import React, { useContext, useLayoutEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { logoutUser } from '../../actions/loginActions'
import { LoginContext } from '../../context/LoginContext'
import { deleteUserFromCookie } from '../../cookies/cookies'
import LoginPage from '../login/loginPage'

const Header = () => {

    const { userData, loginDispatch } = useContext(LoginContext)
    const [isToggleClicked, setIsToggleClicked] = useState(false)
    const [isLoginClicked, setIsLoginClicked] = useState(false)
    const history = useHistory()
    const onClickLogout = () => {
        loginDispatch(logoutUser())
        deleteUserFromCookie()
        history.push("/home")
    }
    const onToggleClick = () => {
        setIsToggleClicked(!isToggleClicked)
    }
    const onLoginClick = () => {
        setIsLoginClicked(!isLoginClicked)
    }
    return (
        <div className="header">
            {document.documentElement.clientWidth > 450 ? <div className="header__nav">
                <NavLink className="home-nav" to="/home">
                    <img alt="לוגו" className="yad-2-logo" src="https://assets.yad2.co.il/yad2site/y2assets/images/header/yad2Logo.png"></img>
                </NavLink>
                <button onClick={onToggleClick} className="toggle-button">
                    <div className="toggle-bar-wrapper">
                        <span className="toggle-button__bar"></span>
                        <span className="toggle-button__bar"></span>
                        <span className="toggle-button__bar"></span>
                    </div>
                    <div className="toggle-text"> תפריט </div>
                </button>
                {isLoginClicked ? <LoginPage onLoginClick={onLoginClick} /> : ""}
                <ul className="header-left">
                    <li className="header-list-item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="login-button" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M19.364 4.636a2 2 0 0 1 0 2.828a7 7 0 0 1 -1.414 7.072l-2.122 2.12a4 4 0 0 0 -.707 3.536l-11.313 -11.312a4 4 0 0 0 3.535 -.707l2.121 -2.123a7 7 0 0 1 7.072 -1.414a2 2 0 0 1 2.828 0z"></path>
                            <path d="M7.343 12.414l-.707 .707a3 3 0 0 0 4.243 4.243l.707 -.707"></path>
                        </svg>
                    </li>
                    <li className="header-list-item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="login-button" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                        </svg>
                    </li>
                    <li className="header-list-item">
                        {userData.user ?
                            <div className="user-header-content">
                                <span className="initials">{userData.user.name}</span>

                                <ul className="user-dropdown">
                                    <li>
                                        איזור אישי
                                    </li>
                                    <li onClick={onClickLogout}>
                                        התנתקות
                                    </li>
                                </ul>
                            </div> : <svg className="login-button" onClick={onLoginClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                            </svg>}

                    </li>
                    <li>
                        <button className="new-ad-button">+ פרסום מודעה חדשה </button>
                    </li>
                </ul>
            </div> :
                <div className="header__nav_mobile">
                    <button onClick={onToggleClick} className="toggle-button">
                        <span className="toggle-button__bar"></span>
                        <span className="toggle-button__bar"></span>
                        <span className="toggle-button__bar"></span>
                    </button>
                    {isToggleClicked ? <nav className="mobile-nav">
                        <ul className="mobile-nav__items">
                            <li className="mobile-nav__item">
                                <NavLink activeClassName="header__active-link" className="home-nav" to="/home"> Home</NavLink>
                            </li>
                            <li className="mobile-nav__item">
                                <NavLink activeClassName="header__active-link" className="home-nav" to=""> Anywhere</NavLink>
                            </li>
                        </ul>
                    </nav> : ""}
                </div>}
        </div>
    )
}

export default Header
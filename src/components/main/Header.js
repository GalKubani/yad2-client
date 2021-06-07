import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import LoginPage from '../login/loginPage'

const Header = () => {

    // const {userData,loginDispatch}=useContext(LoginContext)
    const [isToggleClicked, setIsToggleClicked] = useState(false)
    const [isLoginClicked, setIsLoginClicked] = useState(false)
    // const history= useHistory()
    // const onClickLogout=()=>{
    //     loginDispatch(logoutUser())
    //     deleteUserFromCookie()
    //     history.push("/home")
    // }
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
                <div onClick={onLoginClick} className="login-button">התחברות
                </div>
                {isLoginClicked ? <LoginPage onLoginClick={onLoginClick} /> : ""}
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
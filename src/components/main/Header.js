import React, { useContext,useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

const Header=()=>{

    // const {userData,loginDispatch}=useContext(LoginContext)
    const [isToggleClicked,setIsToggleClicked]=useState(false)
    // const history= useHistory()
    // const onClickLogout=()=>{
    //     loginDispatch(logoutUser())
    //     deleteUserFromCookie()
    //     history.push("/home")
    // }
    const onToggleClick=(e)=>{
        setIsToggleClicked(!isToggleClicked)
    }
    return (
        <div className="header">
                {document.documentElement.clientWidth>450? <div className="header__nav">
                <NavLink activeClassName="header__active-link" className="home-nav" to="/home"> Home</NavLink>
                {/* <div>
                    <NavLink activeClassName="header__active-link" to="/rooms">Rooms</NavLink>

                    {!!userData.user ?
                     <div onClick={onClickLogout} className="header__logout-nav"> Logout</div>:
                        <NavLink activeClassName="header__active-link" to="/login">Login</NavLink>}
                </div> */}
            </div>:
            <div className="header__nav_mobile">
                <button onClick={onToggleClick} className="toggle-button">
                    <span className="toggle-button__bar"></span>
                    <span className="toggle-button__bar"></span>
                    <span className="toggle-button__bar"></span>
                </button>
                {isToggleClicked?<nav className="mobile-nav">
                    <ul className="mobile-nav__items">
                        <li className="mobile-nav__item">
                            <NavLink activeClassName="header__active-link" className="home-nav" to="/home"> Home</NavLink>
                        </li>
                        <li className="mobile-nav__item">
                            <NavLink activeClassName="header__active-link" className="home-nav" to=""> Anywhere</NavLink>
                        </li>
                    </ul>
                </nav>:""}
            </div>}
        </div>
    )
}

export default Header
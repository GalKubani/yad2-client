import React from 'react'
import { NavLink } from 'react-router-dom'


const PersonalAreaNavbar = () => {
    return (
        <div className="personal-area-header">
            <ul className="header-nav-list">
                <li className="header-nav-list-item">
                    <NavLink activeClassName="header-nav-item-active" className="header__nav-text" to="/personal-area">
                        עדכון ועריכת מודעות
                        </NavLink>
                </li>
                <li className="header-nav-list-item">
                    <NavLink activeClassName="header-nav-item-active" className="header__nav-text" to="/personal-area-edit">
                        עדכון פרטים
                        </NavLink>
                </li>
            </ul>
        </div>
    )
}
export default PersonalAreaNavbar
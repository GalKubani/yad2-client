import React, { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'
import PersonalAreaNavbar from './PersonalAreaNavbar'



const UserPersonalArea = () => {
    document.getElementsByTagName("title")[0].innerHTML = "אזור אישי"
    const { userData } = useContext(LoginContext)
    return (
        <div className="personal-area-container">
            <PersonalAreaNavbar />
            <div className="personal-area-main-wrapper">
                <div className="text-wrapper">
                    <p>שלום {userData.user.name || userData.user.email[0]}!, יש לך {(0)} מודעות פעילות</p>
                    <p>כאן תוכל/י לבצע שינויים על המודעות שלך</p>
                    <p>למשל למחוק, לעדכן ולהקפיץ את מודעתך למקום גבוה יותר בלוח.</p>
                </div>

            </div>
        </div>

    )
}

export default UserPersonalArea
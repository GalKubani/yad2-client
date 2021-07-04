import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { findUserAdverts } from '../../server/db'
import CurrentAdvertDashboard from './CurrentAdvertDashboard'
import PersonalAreaNavbar from './PersonalAreaNavbar'



const UserPersonalArea = () => {
    document.getElementsByTagName("title")[0].innerHTML = "אזור אישי"
    const { userData } = useContext(LoginContext)
    const [userAdverts, setUserAdverts] = useState([])
    useEffect(() => {
        async function getAdverts() {
            console.log("fetching adverts")
            try {
                await findUserAdverts(userData.token).then((res) => { setUserAdverts(res) })
            } catch (err) { console.log(err) }
        }
        getAdverts()
    }, [userData.token])
    return (
        <div className="personal-area-container">
            <PersonalAreaNavbar />
            <div className="personal-area-main-wrapper">
                <div className="text-wrapper">
                    <p>שלום {userData.user.name || userData.user.email[0]}!, יש לך {userAdverts.length} מודעות פעילות</p>
                    <p>כאן תוכל/י לבצע שינויים על המודעות שלך</p>
                    <p>למשל למחוק, לעדכן ולהקפיץ את מודעתך למקום גבוה יותר בלוח.</p>
                </div>
            </div>
            <CurrentAdvertDashboard userAdverts={userAdverts} />
        </div>

    )
}

export default UserPersonalArea
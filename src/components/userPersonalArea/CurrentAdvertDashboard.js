import React, { useState } from 'react'
import EditAdvert from './EditAdvert'
import MyAdvert from './MyAdvert'

const headerNames = ["סוג הנכס", "כתובת", "איש קשר", "מחיר", "חדרים", "קומה", "תמונה", "שעת הקפצה", "תאריך", "סטטוס"]
const CurrentAdvertDashboard = ({ userAdverts }) => {

    const [currentAdvert, setCurrentAdvert] = useState({})
    const [isAdvertClicked, setIsAdvertClicked] = useState(false)
    const [isAdvertEditClicked, setIsAdvertEditClicked] = useState(false)

    userAdverts = userAdverts.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
    const onRowClick = (e) => {
        for (let advert of userAdverts) {
            if (advert._id + "" === e.target.parentElement.id) {
                setCurrentAdvert(advert)
                setIsAdvertClicked(!isAdvertClicked)
            }
        }
    }
    return (
        <div className="adverts-table">
            <table cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr className="table-headers">
                        {headerNames.map((title, index) => {
                            return (<th className={index === 1 ? "address-table" : ""} key={title}>{title}</th>)
                        })}
                    </tr>
                    {userAdverts.map((advert) => {
                        return (
                            <tr id={advert._id} onClick={onRowClick} key={advert._id} className="table-advert">
                                <td>{advert.assetType} </td>
                                <td>{advert.assetCity + " - " + advert.assetStreet}</td>
                                <td>{advert.contacts[0].contactName}</td>
                                <td>{advert.assetPrice || "-"}</td>
                                <td>{advert.assetTotalRooms}</td>
                                <td>{advert.assetBuildingTotalFloors}</td>
                                <td>{advert.assetPictures.length > 0 ? "קיימת" : ""}</td>
                                <td>{new Date(advert.updatedAt).toLocaleTimeString("he-IL")}</td>
                                <td>{new Date(advert.updatedAt).toLocaleDateString("he-IL")}</td>
                                <td>{advert.isAdvertActive ? "פעילה" : "לא פעילה"}</td>
                            </tr>
                        )
                    })}
                    {isAdvertClicked && <MyAdvert userAdvertsNumber={userAdverts.length} setIsAdvertEditClicked={setIsAdvertEditClicked} setIsAdvertClicked={setIsAdvertClicked} currentAdvert={currentAdvert} />}
                    {isAdvertEditClicked && <EditAdvert setIsAdvertEditClicked={setIsAdvertEditClicked} setIsAdvertClicked={setIsAdvertClicked} userAdvertsNumber={userAdverts.length} currentAdvert={currentAdvert} />}
                </tbody>
            </table>
        </div>
    )
}
export default CurrentAdvertDashboard
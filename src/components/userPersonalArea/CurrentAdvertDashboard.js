import React, { useState } from 'react'
import EditAdvert from './EditAdvert'
import MyAdvert from './MyAdvert'

const headerNames = ["סוג הנכס", "כתובת", "איש קשר", "מחיר", "חדרים", "קומה", "תמונה", "שעת הקפצה", "תאריך", "סטטוס"]
const CurrentAdvertDashboard = ({ userAdverts }) => {

    const [currentAdvert, setCurrentAdvert] = useState({})
    const [areAdvertsShown, setAreAdvertsShown] = useState(true)
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
                setAreAdvertsShown(false)
            }
        }
    }
    return (
        <div className="adverts-table">
            <table cellSpacing="0" cellPadding="0">
                <tbody>
                    {document.documentElement.clientWidth > 450 ? <tr className="table-headers">
                        {headerNames.map((title, index) => {
                            return (<th className={index === 1 ? "address-table" : ""} key={title}>{title}</th>)
                        })}
                    </tr> : ""}
                    {document.documentElement.clientWidth > 450 ? userAdverts.map((advert) => {
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
                    }) : areAdvertsShown && userAdverts.map((advert) => {
                        return (<tr onClick={onRowClick} key={advert._id} className="mobile-advert">
                            <td id={advert._id} className="img-wrapper-user"><img alt="" src={advert.assetPictures[0] || "https://my.yad2.co.il//newOrder/images/publish/selectImage.png"}></img></td>
                            <td id={advert._id} className="mobile-advert-text">
                                <div className="bold">{advert.assetCity}</div>
                                <div>עדכון אחרון:{new Date(advert.updatedAt).toLocaleDateString("he-IL")}</div>
                                <div className="bold">מחיר: {advert.assetPrice ? (advert.assetPrice.toLocaleString()) + "₪" : "לא צוין"}</div>
                                <div>{advert.isAdvertActive ? "פעילה" : "לא פעילה"}</div>
                            </td>
                            <td> <button className="edit-mobile" onClick={() => {
                                setCurrentAdvert(advert)
                                setIsAdvertClicked(false)
                                setIsAdvertEditClicked(true)
                                setAreAdvertsShown(false)
                            }}><span></span></button></td>
                        </tr>)
                    })}
                    {isAdvertClicked && <MyAdvert setAreAdvertsShown={setAreAdvertsShown} userAdvertsNumber={userAdverts.length} setIsAdvertEditClicked={setIsAdvertEditClicked} setIsAdvertClicked={setIsAdvertClicked} currentAdvert={currentAdvert} />}
                    {isAdvertEditClicked && <EditAdvert setAreAdvertsShown={setAreAdvertsShown} setIsAdvertEditClicked={setIsAdvertEditClicked} setIsAdvertClicked={setIsAdvertClicked} userAdvertsNumber={userAdverts.length} currentAdvert={currentAdvert} />}
                </tbody>
            </table>
        </div>
    )
}
export default CurrentAdvertDashboard
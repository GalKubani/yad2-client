import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { deleteAdvert, editAdvert } from '../../server/db'
import { calculateDate } from '../../utils/calculateDate'

const MyAdvert = ({ setAreAdvertsShown, userAdvertsNumber, setIsAdvertEditClicked, setIsAdvertClicked, currentAdvert }) => {

    const [isImmidiateEntrence, setIsImmidiateEntrence] = useState(false)
    const { userData } = useContext(LoginContext)

    useEffect(() => {
        document.documentElement.clientWidth > 900 ? window.scroll({ behavior: 'smooth', top: (userAdvertsNumber * 34) + 270 }) : console.log("")
        setIsImmidiateEntrence(calculateDate(currentAdvert.dateOfEntry))
    }, [currentAdvert, userAdvertsNumber])


    let assetPictures = [...currentAdvert.assetPictures];

    const onClickEdit = (e) => {
        e.preventDefault()
        setIsAdvertClicked(false)
        setIsAdvertEditClicked(true)
    }
    const onChangeActiveStatus = async (e) => {
        e.preventDefault()
        if (e.target.previousElementSibling.value === currentAdvert.isAdvertActive + "") { return }
        else {
            try {
                await editAdvert({ isAdvertActive: e.target.previousElementSibling.value }, userData.token, currentAdvert._id).then((res) => {
                    document.location.reload()
                })
            } catch (err) { console.log(err) }
        }
    }
    const onDeleteAdvert = async (e) => {
        e.preventDefault()
        let answer = window.confirm("האם אתה בטוח שברצונך למחוק הודעה?")
        if (!answer) { return }
        try {
            await deleteAdvert(userData.token, currentAdvert._id).then((res) => {
                console.log(res)
                document.location.reload()
            })
        }
        catch (err) { console.log(err) }
    }
    const onJumpAdvert = async (e) => {
        e.preventDefault()
        try {
            await editAdvert({ assetCharecteristics: currentAdvert.assetCharecteristics + " " }, userData.token, currentAdvert._id).then((res) => {
                document.location.reload()
            })
        } catch (err) { console.log(err) }
    }
    const onClickReturn = (e) => {
        e.preventDefault()
        setIsAdvertClicked(false)
        setAreAdvertsShown(true)
    }
    return (
        <tr>
            <td colSpan="10">
                <div className="my-advert-container">
                    <div className="my-advert-content">
                        <div className="my-content-title">תיאור המודעה</div>
                        <div className="content-column-wrapper">
                            <div className="advert-content-column">
                                <div className="advert-field"> <span>סוג הנכס </span><div>{": "}{currentAdvert.assetType}</div></div>
                                <div className="advert-field"> <span>ישוב</span><div>{": "}{currentAdvert.assetCity}</div></div>
                                <div className="advert-field"> <span>רחוב</span><div>{": "}{currentAdvert.assetStreet}</div></div>
                                <div className="advert-field"> <span>מס' בית</span><div>{": "}{currentAdvert.assetHouseNumber}</div></div>
                                <div className="advert-field"> <span>כניסה</span><div>{": "}{currentAdvert.assetEntrenceNumber || "ללא"}</div></div>
                                <div className="advert-field"> <span>שכונה</span><div>{": "}{currentAdvert.assetNeighborhood}</div></div>
                                <div className="advert-field"> <span>קומה</span><div>{": "}{currentAdvert.assetFloorNumber || "ללא"}</div></div>
                                <div className="advert-field"> <span>מתוך קומות</span><div>{": "}{currentAdvert.assetBuildingTotalFloors || "ללא"}</div></div>
                                <div className="advert-field"> <span>מספר חדרים</span><div>{": "}{currentAdvert.assetTotalRooms}</div></div>
                                <div className="advert-field"> <span>מרפסת</span><div>{": "}{currentAdvert.assetTotalPorchs || "ללא"}</div></div>
                                <div className="advert-field"> <span>גודל במ"ר</span><div>{": "}{currentAdvert.assetSize}</div></div>
                                <div className="advert-field"> <span>חניה</span><div>{": "}{currentAdvert.assetTotalParking || "ללא"}</div></div>
                            </div>
                            <div className="advert-content-column">
                                <div className="content-column-wrapper">
                                    {["מיזוג", "דוד שמש", "ריהוט", "מעלית", "ממד", "משופצת"].map((value) => {
                                        return (
                                            <div className={"charecteristics-div " + (currentAdvert.assetCharecteristics.includes(value) ? " " : "unchecked")} key={value}>{value}</div>
                                        )
                                    })}
                                    <div className="advert-field"> <span>מחיר</span><div>{": "}{currentAdvert.assetPrice || "לא צוין מחיר"}</div></div>
                                    <div className="advert-field"> <span>תיאור ופרטים נוספים(עד 400 תווים):</span><div>{currentAdvert.assetDetails}</div></div>
                                </div>
                            </div>
                            <div className="advert-content-column">
                                <div className="advert-field"> <span>תאריך כניסה</span><div>{": "}{currentAdvert.dateOfEntry}</div></div>
                                {isImmidiateEntrence && <div className="advert-field"><img alt="" src="https://images.yad2.co.il/Pic/yad2new/2016_icons/formitems/Immediate_on.png"></img><span className="orange">מיידי</span></div>}
                                <div className="advert-field"> <span>דוא"ל</span><div>{": "}{userData.user.email}</div></div>
                                <div className="advert-field"> <span>איש קשר</span><div>{": "}{currentAdvert.contacts[0].contactName}</div></div>
                                <div className="advert-field"> <span>טלפון ראשי</span><div>{": "}{currentAdvert.contacts[0].contactNumber}</div></div>
                            </div>
                        </div>
                    </div>
                    {document.documentElement.clientWidth > 900 ? <div className="my-advert-management">
                        <div className="my-content-title">ניהול</div>
                        <button onClick={onClickEdit} className="edit-button"> <span>עריכת פרטים</span> </button>
                        <div className="edit-status-container">
                            <select defaultValue={currentAdvert.isAdvertActive}>
                                <option value={true}>מודעה פעילה</option>
                                <option value={false}>לא פעילה</option>
                            </select>
                            <button onClick={onChangeActiveStatus} className="edit-status-button">עדכן</button>
                            <button className="delete-advert-button" onClick={onJumpAdvert}>הקפצת מודעה</button>
                            <button onClick={onDeleteAdvert} className="delete-advert-button">🗑 מחיקת מודעה</button>
                        </div>
                    </div> :
                        <div className="my-advert-management">
                            <div className="logo-button edit" onClick={onClickEdit}> <span>עריכה</span> </div>
                            <div className="logo-button jump" onClick={onJumpAdvert}><span>הקפץ</span> </div>
                            <div className="logo-button delete" onClick={onDeleteAdvert}><span>מחק</span> </div>
                            <div className="logo-button back" onClick={onClickReturn}><span>חזור</span> </div>
                        </div>
                    }
                    <div className="my-advert-pictures">
                        <div className="my-content-title">תמונות</div>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
                            return (
                                <div className="my-advert-image-container" key={index}>
                                    <img alt="" src={assetPictures[index] ? assetPictures[index] : "https://my.yad2.co.il//newOrder/images/publish/selectImage.png"}></img>
                                </div>)
                        })}
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default MyAdvert
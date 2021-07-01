import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { editAdvert } from '../../server/db'
import { calculateDate } from '../../utils/calculateDate'
import PictureInput from '../newAdvert/PictureInput'
import RadioOptions from '../newAdvert/RadioOptions'
const EditAdvert = ({ setIsAdvertEditClicked, setIsAdvertClicked, currentAdvert }) => {
    const { userData } = useContext(LoginContext)
    const [assetPicturesFile, setAssetPicturesFile] = useState([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined])
    const [assetPictureData, setAssetPictureData] = useState([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined])
    const [isImmidiateEntrence, setIsImmidiateEntrence] = useState(false)







    // when edit is complete
    // will nn to send only the new files to be added on advert via add pic route
    // const onChangeActiveStatus = async (e) => {
    //     e.preventDefault()
    //     if (e.target.previousElementSibling.value === currentAdvert.isAdvertActive + "") { return }
    //     else {
    //         try {
    //             await editAdvert({ isAdvertActive: e.target.previousElementSibling.value }, userData.token, currentAdvert._id).then((res) => {
    //                 document.location.reload()
    //             })
    //         } catch (err) { console.log(err) }
    //     }
    // }
    const onClickReturn = (e) => {
        setIsAdvertClicked(true)
        setIsAdvertEditClicked(false)
    }
    const onCheckRadio = (e) => {
        let currentActive = e.target.parentElement.parentElement.getElementsByClassName("radio-active")[0]
        currentActive.classList.remove("radio-active")
        e.target.nextElementSibling.classList.add("radio-active");
    }
    const onTextAreaInput = (e) => {
        if (e.target.value.length > 400) {
            e.target.value = e.target.value.slice(0, e.target.value.length - 1)
            return
        }
    }
    const onFormSubmit = (e) => {
        e.preventDefault()
    }
    const dispatchUpdate = (data, option) => {
        if (option === "pictures") { setAssetPicturesFile(data) }
        else { setAssetPictureData([...data]) }
    }
    useEffect(() => {
        let assetPictures = [...currentAdvert.assetPictures];
        let assetSrc = []
        let srcData = []
        const initialiseComponent = () => {
            for (let picture of assetPictures) {
                let binary = ''
                let bytes = [].slice.call(new Uint8Array(picture.data));
                bytes.forEach((b) => binary += String.fromCharCode(b));
                assetSrc.push(window.btoa(binary))
            }
        }
        initialiseComponent()
        for (let i = 0; i < 10; i++) {
            srcData.push(assetPictures[i] ? ("data:image/jpeg;base64," + assetSrc[i]) : "")
            if (srcData.length === 10) { setAssetPicturesFile(srcData) }
        }
        setIsImmidiateEntrence(calculateDate(currentAdvert.dateOfEntry))
    }, [currentAdvert])
    return (
        <tr>
            <td colSpan="10">
                <form onSubmit={onFormSubmit} className="my-advert-container">
                    <div className="my-advert-content">
                        <div className="my-content-title">תיאור המודעה</div>
                        <div className="content-column-wrapper">
                            <div className="advert-content-column">
                                <div className="advert-field"> <span>סוג הנכס </span><div>{": "}{currentAdvert.assetType}</div></div>
                                <div className="advert-field"> <span>*מצב הנכס:</span>
                                    <select>
                                        <option value="">משופץ? חדש מקבלן? </option>
                                        <option value="חדש מקבלן (לא גרו בו בכלל)">חדש מקבלן (לא גרו בו בכלל)</option>
                                        <option value=" חדש (נכס בן עד 5 שנים)"> חדש (נכס בן עד 5 שנים) </option>
                                        <option value=" משופץ (שופץ ב5 השנים האחרונות)"> משופץ (שופץ ב5 השנים האחרונות) </option>
                                        <option value=" במצב שמור (במצב טוב, לא שופץ)"> במצב שמור (במצב טוב, לא שופץ) </option>
                                    </select>
                                </div>
                                <div className="advert-field"> <span>ישוב</span><div>{": "}{currentAdvert.assetCity}</div></div>
                                <div className="advert-field"> <span>רחוב</span><div>{": "}{currentAdvert.assetStreet}</div></div>
                                <div className="advert-field"> <span>מס' בית</span><div>{": "}{currentAdvert.assetHouseNumber}</div></div>
                                <div className="advert-field"> <span>כניסה</span><div>{": "}{currentAdvert.assetEntrenceNumber || "ללא"}</div></div>
                                <div className="advert-field"> <span>שכונה</span><div>{": "}{currentAdvert.assetNeighborhood}</div></div>
                                <div className="advert-field"> <span>קומה</span><div>{": "}{currentAdvert.assetFloorNumber || "ללא"}</div></div>
                                <div className="advert-field"> <span>מתוך קומות</span><div>{": "}{currentAdvert.assetBuildingTotalFloors || "ללא"}</div></div>
                                <div className="advert-field"> <span>מספר חדרים</span><div>{": "}{currentAdvert.assetTotalRooms}</div></div>
                                <div className="advert-field radio-field"> <span>מרפסת:</span><div className="property-width"><RadioOptions radioName="porch" onCheckBox={onCheckRadio} /></div></div>
                                <div className="advert-field"> <span>גודל במ"ר</span><div>{": "}<input defaultValue={currentAdvert.assetSize}></input> </div></div>
                                <div className="advert-field radio-field"> <span>חניה:</span><div className="property-width"><RadioOptions radioName="parking" onCheckBox={onCheckRadio} /></div></div>
                            </div>
                            <div className="advert-content-column">
                                <div className="content-column-wrapper">
                                    {/* nn to add checkbox here */}
                                    {["מיזוג", "דוד שמש", "ריהוט", "מעלית", "ממד", "משופצת"].map((value) => {
                                        return (
                                            <div className={"charecteristics-div " + (currentAdvert.assetCharecteristics.includes(value) ? " " : "unchecked")} key={value}>{value}</div>
                                        )
                                    })}
                                    <div className="advert-field"> <span>מחיר</span><div>{": "}<input defaultValue={currentAdvert.assetPrice}></input></div></div>
                                    <div className="advert-field"> <span>תיאור ופרטים נוספים(עד 400 תווים):</span><div><textarea onInput={onTextAreaInput} defaultValue={currentAdvert.assetDetails}></textarea></div></div>
                                </div>
                            </div>
                            <div className="advert-content-column">
                                <div className="advert-field"> <span>תאריך כניסה</span><div>{": "}{currentAdvert.dateOfEntry}</div></div>
                                {/* nn to add calendar here */}
                                {isImmidiateEntrence && <div className="advert-field"><img alt="" src="https://images.yad2.co.il/Pic/yad2new/2016_icons/formitems/Immediate_on.png"></img><span className="orange">מיידי</span></div>}
                                <div className="advert-field"> <span>דוא"ל</span><div>{": "}{userData.user.email}</div></div>
                                <div className="advert-field"> <span>איש קשר</span><div>{": "}<input defaultValue={currentAdvert.contacts[0].contactName}></input></div></div>
                                <div className="advert-field"> <span>טלפון ראשי</span><div>{": "}<input type="text" className="num-input" defaultValue={currentAdvert.contacts[0].contactNumber}></input></div></div>
                            </div>
                        </div>
                    </div>
                    <div className="my-advert-management">
                        <div className="my-content-title">ניהול</div>
                        <button onClick={onClickReturn} className="delete-advert-button">חזרה</button>
                        <div className="edit-status-container">
                            <span>סטטוס:</span>
                            <select defaultValue={currentAdvert.isAdvertActive}>
                                <option value={true}>מודעה פעילה</option>
                                <option value={false}>לא פעילה</option>
                            </select>
                        </div>
                        <button type="submit" className="edit-button">עדכן </button>
                    </div>
                    <div className="my-advert-pictures">
                        <div className="my-content-title">תמונות</div>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
                            return (
                                <PictureInput className={"my-advert-image-container"} value={index} key={index} assetPicturesFile={assetPicturesFile} dispatchUpdate={dispatchUpdate}
                                    assetPictureData={assetPictureData} />
                            )
                        })}
                    </div>
                </form>
            </td>
        </tr>
    )
}
export default EditAdvert
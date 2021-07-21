import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { deleteMediaFromS3, editAdvert, uploadMediaToS3 } from '../../server/db'
import Calendar from 'react-calendar';
import { calculateDate } from '../../utils/calculateDate'
import PictureInput from '../newAdvert/PictureInput'
import RadioOptions from '../newAdvert/RadioOptions'
const EditAdvert = ({ setIsAdvertEditClicked, setIsAdvertClicked, currentAdvert }) => {
    const { userData } = useContext(LoginContext)
    const [assetPicturesFileSrc, setAssetPicturesFile] = useState([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined])
    const [assetPictureData, setAssetPictureData] = useState([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined])
    const [isImmidiateEntrence, setIsImmidiateEntrence] = useState(false)
    const [dateValue, onChange] = useState(calculateDate(currentAdvert.dateOfEntry, true));
    const [isCalendarVisible, setIsCalendarVisible] = useState(false)

    const onClickReturn = () => {
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
    const onFormSubmit = async (e) => {
        e.preventDefault()
        let allInputs = e.target.getElementsByTagName("input")
        let allCheckboxes = e.target.getElementsByClassName("checkbox-wrapper box-active")
        let assetCondition = e.target.getElementsByTagName("select")[1]
        let isAdvertActive = e.target.getElementsByTagName("select")[0].value
        let textArea = e.target.getElementsByTagName("textarea")[0]
        let allRadioOptions = e.target.getElementsByClassName("radio_input")
        let assetCharecteristics = [], assetPictures = [], removedPicsKeys = []
        let assetTotalParking, assetTotalPorchs
        let existingImages = []
        for (let picture of currentAdvert.assetPictures) {
            if (assetPicturesFileSrc.includes(picture)) {
                existingImages.push(picture)
            }
            else { removedPicsKeys.push(picture.slice(picture.indexOf("s.com/") + 6)) }
        }
        for (let i = 0; i < 10; i++) {
            if (!assetPicturesFileSrc[i] && !assetPictureData[i]) { continue }
            else { assetPictures.push(assetPictureData[i]) }
        }
        let mediaData = { assetPictures }
        for (let option of allRadioOptions) {
            if (option.checked) {
                if (option.name === "porch") { assetTotalPorchs = option.value }
                else { assetTotalParking = option.value }
            }
        }
        for (let box of allCheckboxes) { assetCharecteristics.push(box.children[0].value) }
        if (!allInputs[17].value || !allInputs[18].value) { return }
        let dateOfEntry = dateValue.toLocaleDateString("he-IL", { month: "2-digit", day: "2-digit" })
        let advertData = {
            assetTotalParking, assetTotalPorchs, isAdvertActive,
            assetDetails: textArea.value, assetCharecteristics,
            assetCondition: assetCondition.value || currentAdvert.assetCondition, assetBuiltSize: allInputs[4].value,
            assetPrice: allInputs[15].value * 1, dateOfEntry,
            contacts: { contactName: allInputs[17].value, contactNumber: allInputs[18].value },
        }
        try {
            await uploadMediaToS3(mediaData, userData.token, currentAdvert._id).then(async (res) => {
                deleteMediaFromS3(removedPicsKeys)
                advertData.assetPictures = [...existingImages, ...res]
                await editAdvert(advertData, userData.token, currentAdvert._id).then((res) => {
                    document.location.reload()
                })
            })
        } catch (err) { console.log(err) }
    }
    const dispatchUpdate = (data, option) => {
        if (option === "pictures") { setAssetPicturesFile(data) }
        else { setAssetPictureData([...data]) }
    }
    const onCheckboxClick = (e) => {
        if (e.target.checked) { e.target.parentElement.classList.add("box-active") }
        else { e.target.parentElement.classList.remove("box-active") }
    }
    useEffect(() => {
        setAssetPicturesFile([...currentAdvert.assetPictures])
        setIsImmidiateEntrence(calculateDate(currentAdvert.dateOfEntry))
    }, [currentAdvert])
    useEffect(() => {
        setIsImmidiateEntrence(dateValue < new Date())
        setIsCalendarVisible(false)
    }, [dateValue])
    return (
        <tr>
            <td colSpan="10">
                <form onSubmit={onFormSubmit} className="my-advert-container">
                    <div className="my-advert-management editing">
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
                    <div className="my-advert-content editing">
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
                                <div className="advert-field radio-field editing"> <span>מרפסת:</span><div className="property-width"><RadioOptions radioName="porch" onCheckBox={onCheckRadio} /></div></div>
                                <div className="advert-field"> <span>גודל במ"ר</span><div>{": "}<input defaultValue={currentAdvert.assetSize}></input> </div></div>
                                <div className="advert-field radio-field editing"> <span>חניה:</span><div className="property-width"><RadioOptions radioName="parking" onCheckBox={onCheckRadio} /></div></div>
                            </div>
                            <div className="advert-content-column">
                                <div className="content-column-wrapper">
                                    {["מיזוג", "דוד שמש", "ריהוט", "מעלית", "ממד", "משופצת"].map((value) => {
                                        return (
                                            <div key={value} className="checkbox-wrapper">
                                                <input onClick={onCheckboxClick} defaultChecked={currentAdvert.assetCharecteristics.includes(value)} value={value} type="checkbox" className="property-checkbox" />
                                                <div className="checkbox-label-wrap">{value}</div>
                                            </div>
                                        )
                                    })}
                                    <div className="advert-field"> <span>מחיר</span><div>{": "}<input defaultValue={currentAdvert.assetPrice}></input></div></div>
                                    <div className="advert-field"> <span>תיאור ופרטים נוספים(עד 400 תווים):</span><div><textarea onInput={onTextAreaInput} defaultValue={currentAdvert.assetDetails}></textarea></div></div>
                                </div>
                            </div>
                            <div className="advert-content-column editing">
                                <div className="calendar-wrapper" >
                                    <label>תאריך כניסה*</label>
                                    <input onClick={() => { setIsCalendarVisible(!isCalendarVisible) }} onChange={() => { }} type="text" autoComplete="off" value={dateValue.toLocaleDateString("he-IL", { month: "2-digit", day: "2-digit" })} className="text_input wider" />
                                    {isCalendarVisible && <Calendar value={new Date()} onChange={onChange} minDate={new Date()} locale="he-IL" calendarType="Hebrew" />}
                                </div>
                                {isImmidiateEntrence && <div className="advert-field"><img alt="" src="https://images.yad2.co.il/Pic/yad2new/2016_icons/formitems/Immediate_on.png"></img><span className="orange">מיידי</span></div>}
                                <div className="advert-field"> <span>דוא"ל</span><div>{": "}{userData.user.email}</div></div>
                                <div className="advert-field"> <span>איש קשר</span><div>{": "}<input defaultValue={currentAdvert.contacts[0].contactName}></input></div></div>
                                <div className="advert-field"> <span>טלפון ראשי</span><div>{": "}<input type="text" className="num-input" defaultValue={currentAdvert.contacts[0].contactNumber}></input></div></div>
                            </div>
                        </div>
                    </div>
                    <div className="my-advert-pictures">
                        <div className="my-content-title">תמונות</div>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
                            return (
                                <PictureInput className={"my-advert-image-container"} value={index} key={index} assetPicturesFile={assetPicturesFileSrc} dispatchUpdate={dispatchUpdate}
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
import React, { useState } from 'react'
import RadioOptions from './RadioOptions'



const roomRange = [0]
for (let i = 1; i <= 12; i += 0.5) { roomRange.push(i) }
const PropertyData = ({ onClickForward, currentClassName, onClickBack }) => {

    const [textAreaCounter, setTextAreaCounter] = useState(0)
    const onFinishArea = (e) => {
        e.preventDefault()
        let roomData = e.target.getElementsByTagName("select")[0]
        if (roomData.value * 1 === 0) {
            roomData.classList.add("red")
            return
        }
        let checkboxData = e.target.getElementsByClassName("property-checkbox")
        let allRadios = e.target.getElementsByClassName("radio_input")
        let textAreaValue = e.target.getElementsByTagName("textarea")[0].value
        let checkedRadiosValues = []
        let checkboxValues = []
        for (let option of allRadios) { if (option.checked) { checkedRadiosValues.push(option.value) } }
        for (let option of checkboxData) { if (option.checked) { checkboxValues.push(option.value) } }
        let propertyData = {
            assetTotalRooms: roomData.value * 1,
            assetTotalParking: checkedRadiosValues[0] * 1,
            assetTotalPorchs: checkedRadiosValues[1] * 1,
            assetDetails: textAreaValue,
            assetCharecteristics: checkboxValues
        }
        onClickForward(propertyData)

    }
    const onInputBlur = (e) => {
        e.target.classList.remove("red")
    }
    const onCheckBox = (e) => {
        let currentActive = e.target.parentElement.parentElement.getElementsByClassName("radio-active")[0]
        currentActive.classList.remove("radio-active")
        e.target.nextElementSibling.classList.add("radio-active");
    }
    const onTextAreaInput = (e) => {
        if (e.target.value.length > 400) {
            e.target.value = e.target.value.slice(0, e.target.value.length - 1)
            return
        }
        setTextAreaCounter(e.target.value.length)
    }
    const onCheckboxClick = (e) => {
        if (e.target.checked) { e.target.parentElement.classList.add("box-active") }
        else { e.target.parentElement.classList.remove("box-active") }
    }
    return (
        <div className={currentClassName}>
            <span className="number-icon">2</span>
            <h2>על הנכס</h2>
            <form onSubmit={onFinishArea}>
                <div>
                    <label>מספר חדרים*</label>
                    <select onBlur={onInputBlur} className="property-width">
                        {roomRange.map((value) => { return <option key={value} value={value}>{value}</option> })}
                    </select>
                </div>
                <div>
                    <label>חניה</label>
                    <div className="property-width">
                        <RadioOptions radioName="parking" onCheckBox={onCheckBox} />
                    </div>
                </div>
                <div>
                    <label>מרפסת</label>
                    <div className="property-width">
                        <RadioOptions radioName="porch" onCheckBox={onCheckBox} />
                    </div>
                </div>
                <div>
                    <label className="larger-text">מאפייני הנכס</label>
                    <div className="checkbox-container">
                        {["מיזוג", "דוד שמש", "ריהוט", "מעלית", "ממד", "משופצת"].map((value) => {
                            return (
                                <div key={value} className="checkbox-wrapper">
                                    <input value={value} onClick={onCheckboxClick} type="checkbox" className="property-checkbox" />
                                    <div className="checkbox-label-wrap">{value}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={document.documentElement.clientWidth > 450 ? "narrower" : ""}>
                    <div><label className="larger-text">מה חשוב לך שידעו על הנכס?</label></div>
                    <div>
                        <label>פרוט הנכס</label>
                        <span className="counter">{textAreaCounter + "/400"}</span>
                        <textarea onInput={onTextAreaInput} placeholder="זה המקום לתאר את הפרטים הבולטים, למשל, האם נערך שיפוץ במבנה, מה שופץ, כיווני אוויר, האווירה ברחוב וכו'"></textarea>
                    </div>
                </div>
                <div className="buttonsNextPreviousWrap">
                    <button onClick={onClickBack} className="btnBack">חזרה</button>
                    <button type="submit" className="btnNext no-focus-outline">להמשיך לשלב הבא</button>
                </div>
            </form>
        </div>
    )
}

export default PropertyData
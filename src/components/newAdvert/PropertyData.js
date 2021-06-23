import React, { useState } from 'react'
import RadioOptions from './RadioOptions'



const roomRange = [0]
for (let i = 1; i <= 12; i += 0.5) { roomRange.push(i) }
const PropertyData = ({ onClickForward, currentClassName, onClickBack }) => {

    const [textAreaCounter, setTextAreaCounter] = useState(0)
    const onFinishArea = (e) => {
        e.preventDefault()
        // will nn to validate all * fields are filled
        // will then nn to send data up, close this box and open the next
        onClickForward()

    }
    const onCheckBox = (e) => {
        e.preventDefault()
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
    return (
        <div className={currentClassName}>
            <span className="number-icon">2</span>
            <h2>על הנכס</h2>
            <form onSubmit={onFinishArea}>
                <div>
                    <label>מספר חדרים*</label>
                    <select className="property-width">
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
                </div>
                <div className="narrower">
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
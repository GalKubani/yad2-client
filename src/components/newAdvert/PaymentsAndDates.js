import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const PaymentAndDates = ({ onClickForward, currentClassName, onClickBack }) => {

    const [dateValue, onChange] = useState(new Date());
    const [isCalendarVisible, setIsCalendarVisible] = useState(false)
    const onFinishArea = (e) => {
        e.preventDefault()
        let allInputs = e.target.getElementsByTagName("input")
        if (!allInputs[1].value) { return }
        let PaymentAndDatesData = {
            assetSize: allInputs[0].value * 1,
            assetBuiltSize: allInputs[1].value * 1,
            assetPrice: allInputs[2].value * 1,
            dateOfEntry: allInputs[3].value
        }
        onClickForward(PaymentAndDatesData)
    }
    useEffect(() => { setIsCalendarVisible(false) }
        , [dateValue])
    return (
        <div className={currentClassName}>
            <span className="number-icon">3</span>
            <h2>תשלומים, תאריכים ועוד</h2>
            <form onSubmit={onFinishArea}>
                <div>
                    <label>מ"ר בנוי</label>
                    <input type="text" autoComplete="off" placeholder='כמה מ"ר יש בנכס' className="text_input wider" />
                </div>
                <div>
                    <label className="smaller-margin">גודל במ"ר סך הכל*</label>
                    <input type="text" autoComplete="off" className="text_input wider" />
                </div>
                <div>
                    <label>מחיר</label>
                    <input type="text" autoComplete="off" placeholder="סכום מינימלי 100,000₪" className="text_input wider" />
                </div>
                <div className="calendar-wrapper" >
                    <label>תאריך כניסה*</label>
                    <input onClick={() => { setIsCalendarVisible(!isCalendarVisible) }} onChange={() => { }} type="text" autoComplete="off" value={dateValue.toLocaleDateString("he-IL", { month: "2-digit", day: "2-digit" })} className="text_input wider" />
                    {isCalendarVisible && <Calendar value={new Date()} onChange={onChange} minDate={new Date()} locale="he-IL" calendarType="Hebrew" />}
                </div>
                <div className="buttonsNextPreviousWrap">
                    <button onClick={onClickBack} className="btnBack">חזרה</button>
                    <button type="submit" className="btnNext no-focus-outline">להמשיך לשלב הבא</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentAndDates
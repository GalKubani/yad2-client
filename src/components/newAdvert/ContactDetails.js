import React, { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'


const ContactDetails = ({ onClickForward, currentClassName, onClickBack }) => {

    const { userData } = useContext(LoginContext)

    const onFinishArea = (e) => {
        e.preventDefault()
        let allInputs = e.target.getElementsByTagName("input")
        if (!allInputs[0].value || !allInputs[1].value) {
            if (!allInputs[0].value) { allInputs[0].classList.add("red") }
            if (!allInputs[1].value) { allInputs[1].classList.add("red") }
            return
        }
        let contactsData = {
            contacts: [{
                contactName: allInputs[0].value,
                contactNumber: allInputs[1].value
            }]
        }
        onClickForward(contactsData)
    }
    const onInputBlur = (e) => {
        e.target.classList.remove("red")
    }
    return (
        <div className={currentClassName}>
            <span className="number-icon">5</span>
            <h2>פרטים ליצירת קשר</h2>
            <form onSubmit={onFinishArea}>
                <div className="contacts-container">
                    <div>
                        <label>שם איש קשר*</label>
                        <input onBlur={onInputBlur} type="text" defaultValue={userData.user.name} autoComplete="off" className="text_input" />
                    </div>
                    <div>
                        <label>טלפון ראשי*</label>
                        <input onBlur={onInputBlur} type="text" defaultValue={userData.user.mainPhone} autoComplete="off" className="text_input" />
                    </div>
                </div>
                <div className="buttonsNextPreviousWrap">
                    <button onClick={onClickBack} className="btnBack">חזרה</button>
                    <button type="submit" className="btnNext no-focus-outline">להוספת מודעה</button>
                </div>
            </form>
        </div>
    )
}

export default ContactDetails
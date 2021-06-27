import React, { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'


const ContactDetails = ({ onClickForward, currentClassName, onClickBack }) => {

    const { userData } = useContext(LoginContext)

    const onFinishArea = (e) => {
        e.preventDefault()
        let allInputs = e.target.getElementsByTagName("input")
        if (!allInputs[0].value || !allInputs[1].value) { return }
        let contactsData = {
            contacts: [{
                contactName: allInputs[0].value,
                contactNumber: allInputs[1].value
            }]
        }
        onClickForward(contactsData)
    }
    return (
        <div className={currentClassName}>
            <span className="number-icon">5</span>
            <h2>פרטים ליצירת קשר</h2>
            <form onSubmit={onFinishArea}>
                <div className="contacts-container">
                    <div>
                        <label>שם איש קשר*</label>
                        <input type="text" defaultValue={userData.user.name} autoComplete="off" className="text_input" />
                    </div>
                    <div>
                        <label>טלפון ראשי*</label>
                        <input type="text" defaultValue={userData.user.mainPhone} autoComplete="off" className="text_input" />
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
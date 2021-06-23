import React, { useState } from 'react'
import AddressData from './AddressData'
import PaymentAndDates from './PaymentsAndDates'
import PropertyData from './PropertyData'
document.getElementsByTagName("title")[0].innerHTML = `פרסום מודעה ביד2 | אלפי מודעות חדשות בכל יום`

const AddAdvert = () => {

    const classOptions = ["data-container-whitebox", "data-container-whitebox data-container-closed"]

    const [currentClassArray, setCurrentClassArray] = useState([classOptions[0], classOptions[1], classOptions[1], classOptions[1], classOptions[1], classOptions[1]])
    const [allFormData, updateAllFormData] = useState({})

    const onClickBack = (e) => {
        e.preventDefault()
        let updatedClassArray = ["", "", "", "", "", ""]
        for (let i = 0; i < 6; i++) {
            if (currentClassArray[i] === classOptions[0]) {
                updatedClassArray[i - 1] = classOptions[0]
                updatedClassArray[i] = classOptions[1]
            }
            else { updatedClassArray[i] = classOptions[1] }
        }
        setCurrentClassArray(updatedClassArray)
    }
    const onClickForward = (dataReturned) => {
        let updatedClassArray = ["", "", "", "", "", ""]
        for (let i = 6; i >= 0; i--) {
            if (currentClassArray[i] === classOptions[0]) {
                updatedClassArray[i + 1] = classOptions[0]
                updatedClassArray[i] = classOptions[1]
            }
            else { updatedClassArray[i] = classOptions[1] }
        }
        setCurrentClassArray(updatedClassArray)
        updateAllFormData({ ...allFormData, ...dataReturned })
    }
    // will have 6 compnents who will send their data back here
    // last component will activate the function to create the ad

    return (
        <div className="new-ad-container">
            <div className="white-box-container">
                <AddressData currentClassName={currentClassArray[0]} onClickForward={onClickForward} />
                <PropertyData currentClassName={currentClassArray[1]} onClickForward={onClickForward} onClickBack={onClickBack} />
                <PaymentAndDates currentClassName={currentClassArray[2]} onClickForward={onClickForward} onClickBack={onClickBack} />
            </div>

        </div>
    )
}

export default AddAdvert
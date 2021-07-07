import React, { useState, useContext } from 'react'
import { uploadMediaToS3, addNewAdvert } from '../../server/db'
import AddressData from './AddressData'
import ContactDetails from './ContactDetails'
import PaymentAndDates from './PaymentsAndDates'
import PicturesAndVideo from './PicturesAndVideo'
import PropertyData from './PropertyData'
import { LoginContext } from '../../context/LoginContext'
import { useHistory } from 'react-router'

const AddAdvert = () => {
    document.getElementsByTagName("title")[0].innerHTML = `פרסום מודעה ביד2 | אלפי מודעות חדשות בכל יום`

    const classOptions = ["data-container-whitebox", "data-container-whitebox data-container-closed"]
    const { userData } = useContext(LoginContext)
    const history = useHistory()
    const [currentClassArray, setCurrentClassArray] = useState([classOptions[0], classOptions[1], classOptions[1], classOptions[1], classOptions[1]])
    const [allFormData, updateAllFormData] = useState({})
    const [mediaFormData, setMediaFormData] = useState({})
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
    const onClickForward = async (dataReturned) => {
        let updatedClassArray = ["", "", "", "", ""]
        let isLastStep = false
        let dataFromMedia = false
        for (let i = 4; i >= 0; i--) {
            if (currentClassArray[i] === classOptions[0]) {
                updatedClassArray[i + 1] = classOptions[0]
                updatedClassArray[i] = classOptions[1]
                if (i === 3) { dataFromMedia = true }
                if (i === 4) { isLastStep = true; }
            }
            else { updatedClassArray[i] = classOptions[1] }
        }
        if (dataFromMedia) {
            setMediaFormData({ ...dataReturned })
            setCurrentClassArray(updatedClassArray)
        }
        else if (!isLastStep) {
            updateAllFormData({ ...allFormData, ...dataReturned })
            setCurrentClassArray(updatedClassArray)
        }
        else {
            let advertData = { ...allFormData, ...dataReturned }
            console.log("creating advert")
            try {
                await addNewAdvert(advertData, userData.token).then(async (res) => {
                    await uploadMediaToS3(mediaFormData, userData.token, res._id).then((res) => {
                        history.push("/home")
                    })
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div className="new-ad-container">
            <div className="white-box-container">
                <AddressData currentClassName={currentClassArray[0]} onClickForward={onClickForward} />
                <PropertyData currentClassName={currentClassArray[1]} onClickForward={onClickForward} onClickBack={onClickBack} />
                <PaymentAndDates currentClassName={currentClassArray[2]} onClickForward={onClickForward} onClickBack={onClickBack} />
                <PicturesAndVideo currentClassName={currentClassArray[3]} onClickForward={onClickForward} onClickBack={onClickBack} />
                <ContactDetails currentClassName={currentClassArray[4]} onClickForward={onClickForward} onClickBack={onClickBack} />
            </div>
        </div>
    )
}

export default AddAdvert
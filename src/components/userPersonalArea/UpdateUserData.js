import React, { useContext, useState } from 'react'
import { updateUser } from '../../actions/loginActions'
import { LoginContext } from '../../context/LoginContext'
import { saveUserOnCookie } from '../../cookies/cookies'
import { getCityDataFromDB, getCityOptionsFromDB, editPersonalData } from '../../server/db'
import DropdownContent from '../main/DropdownContent'
import PersonalAreaNavbar from './PersonalAreaNavbar'

const UpdateUserData = () => {
    document.getElementsByTagName("title")[0].innerHTML = "לקוח - פרטי הלקוח"
    const { userData, loginDispatch } = useContext(LoginContext)
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const [isNeighborhoodDropdownVisible, setIsNeighborhoodDropdownVisible] = useState(false)
    const [isStreetDropdownVisible, setIsStreetDropdownVisible] = useState(false)
    const [selectedCityData, setSelectedCityData] = useState({})
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedNeighborhood, setSelectedNeighborhood] = useState("")
    const [selectedStreet, setSelectedStreet] = useState("")
    const [cityDropdownData, setCityDropdownData] = useState([])
    const [streetDropdownData, setStreetDropdownData] = useState([])
    const [neighborhoodDropdownData, setNeighborhoodDropdownData] = useState([])
    let currentUser = userData.user
    const onLocationInput = async (e) => {
        e.preventDefault()
        if (e.target.name === "street") { setSelectedStreet(e.target.value) }
        else if (e.target.name === "city") { setSelectedCity(e.target.value) }
        else { setSelectedNeighborhood(e.target.value) }
        if (e.target.value.length < 2) { return }
        try {
            if (e.target.name === "city") {
                await getCityOptionsFromDB(e.target.value).then((cities) => {
                    if (cities) {
                        setCityDropdownData(cities.splice(0, 6))
                        setIsDropdownVisible(true)
                    }
                })
            }
            else if (e.target.name === "street") {
                setIsStreetDropdownVisible(true)
                let dataToUpdate = filterData(e.target.value, selectedCityData.streetNames)
                setStreetDropdownData(dataToUpdate)
            }
            else {
                setIsNeighborhoodDropdownVisible(true)
                let dataToUpdate = filterData(e.target.value, selectedCityData.neighborhoods)
                setNeighborhoodDropdownData(dataToUpdate)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const filterData = (value, data) => {
        let filteredData = data.filter(dataChecked => dataChecked.includes(value))
        filteredData.sort(function (a, b) {
            if (a.indexOf(value) <= b.indexOf(value)) { return -1 }
            else return 1
        })
        // Might nn to splice before returning
        return filteredData
    }
    const selectCityOptionClick = async (value) => {
        setSelectedCity(value)
        setIsDropdownVisible(false)
        try {
            await getCityDataFromDB(value).then((cityData) => {
                setNeighborhoodDropdownData(cityData["neighborhoods"])
                setStreetDropdownData(cityData["streetNames"])
                setSelectedCityData(cityData)
            })
        } catch (err) {
            console.log(err)
        }
    }
    const selectStreetOptionClick = (value) => {
        setSelectedStreet(value)
        setIsStreetDropdownVisible(false)
    }
    const selectNeighborhoodOptionClick = (value) => {
        setSelectedNeighborhood(value)
        setIsNeighborhoodDropdownVisible(false)
    }
    const sendForm = async (e) => {
        e.preventDefault()
        let allInputs = e.target.getElementsByTagName("input")
        let formBody = {
            name: allInputs[0].value || userData.user.name,
            lastName: allInputs[1].value || userData.user.lastName,
            city: allInputs[2].value || userData.user.city,
            neighborhood: allInputs[3].value || userData.user.neighborhood,
            street: allInputs[4].value || userData.user.street,
            houseNumber: allInputs[5].value || userData.user.houseNumber,
            mainPhone: allInputs[6].value || userData.user.mainPhone,
            secondaryPhone: allInputs[7].value || userData.user.secondaryPhone,
            dateOfBirth: allInputs[8].value || userData.user.dateOfBirth,
            email: allInputs[9].value || userData.user.email,
        }
        if (allInputs[10].value) {
            formBody.password = allInputs[10].value
        }
        try {
            await editPersonalData(formBody, userData.token).then((res) => {
                saveUserOnCookie({ user: res, token: userData.token })
                loginDispatch(updateUser(res, userData.token))
                document.location.reload()
            })
        } catch (err) {
            console.log(err)
        }

    }
    const isValueInvalid = (value) => {
        return !value
    }
    return (
        <div className="personal-area-container">
            <PersonalAreaNavbar />
            <div className="personal-area-main-wrapper">
                <form onSubmit={sendForm} className="edit-data-form">
                    <div className="form-title-edit"> פרטי יצירת קשר</div>
                    <div className="edit-form-content">
                        <div className="column-content">
                            <ul className="column-list">
                                <li className="column-list-item">
                                    <label>*שם פרטי:</label><input defaultValue={currentUser.name} type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>*שם משפחה:</label>
                                    <input defaultValue={currentUser.lastName} type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>ישוב:</label>
                                    <div>
                                        <input defaultValue={currentUser.city} name="city" type="text" onChange={onLocationInput} value={selectedCity} />
                                        {isDropdownVisible && <DropdownContent name="city" selectOptionClick={selectCityOptionClick} dropdownData={cityDropdownData} />}

                                    </div>
                                </li>
                                <li className="column-list-item">
                                    <label>שכונה:</label>
                                    <div>
                                        <input defaultValue={currentUser.neighborhood} disabled={isValueInvalid(isNeighborhoodDropdownVisible || neighborhoodDropdownData.length > 0)} name="neighborhood" type="text" onChange={onLocationInput} value={selectedNeighborhood} />
                                        {isNeighborhoodDropdownVisible && neighborhoodDropdownData.length > 0 && <DropdownContent name="neighborhood" selectOptionClick={selectNeighborhoodOptionClick} dropdownData={neighborhoodDropdownData} />}
                                    </div>

                                </li>
                                <li className="column-list-item">
                                    <label>רחוב:</label>
                                    <div>
                                        <input defaultValue={currentUser.street} disabled={isValueInvalid(isStreetDropdownVisible || streetDropdownData.length > 0)} name="street" type="text" onChange={onLocationInput} value={selectedStreet} />
                                        {isStreetDropdownVisible && streetDropdownData.length > 0 && <DropdownContent name="street" selectOptionClick={selectStreetOptionClick} dropdownData={streetDropdownData} />}
                                    </div>
                                </li>
                                <li className="column-list-item"><label>מס' בית:</label><input defaultValue={currentUser.houseNumber} type="text" /></li>
                            </ul>
                        </div>
                        <div className="column-content">
                            <ul className="column-list">
                                <li className="column-list-item">
                                    <label>*טלפון ראשי:</label><input defaultValue={currentUser.mainPhone} type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>טלפון 2:</label><input defaultValue={currentUser.secondaryPhone} type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>תאריך לידה:</label><input defaultValue={currentUser.dateOfBirth} type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>*דוא"ל:</label><input defaultValue={currentUser.email} type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>שם משתמש:</label> {userData.user.email}
                                </li>
                                <li className="column-list-item">
                                    <label>לעדכון סיסמה:</label><input type="text" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button type="submit" className="update-button">
                        <div className="white-icon"></div>
                        <div className="button-text">עדכן</div>
                    </button>
                </form>
            </div>
        </div>
    )


}
export default UpdateUserData
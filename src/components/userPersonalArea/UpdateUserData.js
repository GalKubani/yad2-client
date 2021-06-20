import React, { useContext, useState } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { getCityDataFromDB, getCityOptionsFromDB } from '../../server/db'
import DropdownContent from '../main/DropdownContent'
import PersonalAreaNavbar from './PersonalAreaNavbar'

const UpdateUserData = () => {
    document.getElementsByTagName("title")[0].innerHTML = "לקוח - פרטי הלקוח"
    const { userData } = useContext(LoginContext)
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

    const onLocationInput = async (e) => {
        e.preventDefault()
        if (e.target.name === "street") {
            setStreetDropdownData((selectedCityData.streetNames.splice(0, 6)))
            setSelectedStreet(e.target.value)
        }
        else if (e.target.name === "city") { setSelectedCity(e.target.value) }
        else {
            setNeighborhoodDropdownData((selectedCityData.neighborhoods.splice(0, 6)))
            setSelectedNeighborhood(e.target.value)
        }
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
                setStreetDropdownData((selectedCityData.streetsNames.filter(street => street.includes(e.target.value)).splice(0, 6)))
            }
            else {
                setIsNeighborhoodDropdownVisible(true)
                setNeighborhoodDropdownData((selectedCityData.neighborhoods.filter(neighborhood => neighborhood.includes(e.target.value)).splice(0, 6)))
            }
        } catch (err) {
            console.log(err)
        }
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
    }
    const isValueInvalid = (value) => {
        return !value
    }
    return (
        <div className="personal-area-container">
            <PersonalAreaNavbar />
            <div className="personal-area-main-wrapper">
                <form className="edit-data-form">
                    <div className="form-title-edit"> פרטי יצירת קשר</div>
                    <div className="edit-form-content">
                        <div className="column-content">
                            <ul className="column-list">
                                <li className="column-list-item">
                                    <label>*שם פרטי:</label><input type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>*שם משפחה:</label>
                                    <input type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>ישוב:</label>
                                    <div>
                                        <input name="city" type="text" onChange={onLocationInput} value={selectedCity} />
                                        {isDropdownVisible && <DropdownContent name="city" selectOptionClick={selectCityOptionClick} dropdownData={cityDropdownData} />}

                                    </div>
                                </li>
                                <li className="column-list-item">
                                    <label>שכונה:</label>
                                    <div>
                                        <input disabled={isValueInvalid(isNeighborhoodDropdownVisible || neighborhoodDropdownData.length > 0)} name="neighborhood" type="text" onChange={onLocationInput} value={selectedNeighborhood} />
                                        {isNeighborhoodDropdownVisible && neighborhoodDropdownData.length > 0 && <DropdownContent name="neighborhood" selectOptionClick={selectNeighborhoodOptionClick} dropdownData={neighborhoodDropdownData} />}
                                    </div>

                                </li>
                                <li className="column-list-item">
                                    <label>רחוב:</label>
                                    <div>
                                        <input disabled={isValueInvalid(isStreetDropdownVisible || streetDropdownData.length > 0)} name="street" type="text" onChange={onLocationInput} value={selectedStreet} />
                                        {isStreetDropdownVisible && streetDropdownData.length > 0 && <DropdownContent name="street" selectOptionClick={selectStreetOptionClick} dropdownData={streetDropdownData} />}
                                    </div>
                                </li>
                                <li className="column-list-item"><label>מס' בית:</label><input type="text" /></li>
                            </ul>
                        </div>
                        <div className="column-content">
                            <ul className="column-list">
                                <li className="column-list-item">
                                    <label>*טלפון ראשי:</label><input type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>טלפון 2:</label><input type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>תאריך לידה:</label><input type="text" />
                                </li>
                                <li className="column-list-item">
                                    <label>*דוא"ל:</label><input type="text" />
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
                    <button type="submit" onClick={sendForm} className="update-button">
                        <div className="white-icon"></div>
                        <div className="button-text">עדכן</div>
                    </button>
                </form>
            </div>
        </div>
    )


}
export default UpdateUserData
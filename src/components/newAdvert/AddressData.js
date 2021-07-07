import React, { useState } from 'react'
import LocationData from '../home/LocationData'
import { getCityDataFromDB, getLocationsFromDB } from '../../server/db'
const AddressData = ({ onClickForward, currentClassName }) => {


    const [currentSearchValue, setCurrentSearchValue] = useState("")
    const [currentCityStreetData, setCurrentCityStreetData] = useState([])
    const [streetOptionsShown, setStreetOptionsShown] = useState([])
    const [cityOptionsShown, setCityOptionsShown] = useState([])
    const [neighborhoodOptionsShown, setNeighborhoodOptionsShown] = useState([])
    const [didSelectCity, setDidSelectCity] = useState(false)
    const [neighborhoodShown, setNeighborhoodShown] = useState("")

    const onLocationInput = async (e) => {
        e.preventDefault()
        if (e.target.value.length < 2) {
            e.target.nextElementSibling.style.display = "none"
            return
        }
        let locationValue = e.target.value
        if (!locationValue.trim() || !locationValue) { return }
        setCurrentSearchValue(locationValue)
        await getLocationsFromDB(locationValue).then((res) => {
            setCityOptionsShown(res.cityNames.splice(0, 4))
        })
        e.target.nextElementSibling.style.display = "flex"
    }
    const selectOptionClick = (e) => {
        e.stopPropagation()
        setDidSelectCity(true)
        if (e.target.classList.contains("location-category")) {
            e.target.parentElement.parentElement.parentElement.previousElementSibling.value = e.target.previousElementSibling.innerText
            e.target.parentElement.parentElement.parentElement.style.display = "none"
            return
        }
        e.target.parentElement.parentElement.previousElementSibling.value = e.target.children[0].innerText
        e.target.parentElement.parentElement.style.display = "none"
    }
    const onStreetBlur = (e) => {
        e.target.classList.remove("red")
        setNeighborhoodShown(neighborhoodOptionsShown[0]?.split("//")[0].split("שכ")[1] || "רמון")
    }
    const onCityBlur = async (e) => {
        e.target.classList.remove("red")
        try {
            getCityDataFromDB(e.target.value).then((cityData) => {
                setNeighborhoodOptionsShown(cityData["neighborhoods"])
                setCurrentCityStreetData(cityData["streetNames"])
            })
        } catch (err) {
            console.log(err)
        }
    }
    const onStreetInput = (e) => {
        let dataToUpdate = filterData(e.target.value, currentCityStreetData)
        setStreetOptionsShown(dataToUpdate.splice(0, 6))
        setCurrentSearchValue(e.target.value)
        if (e.target.value.length < 2) {
            e.target.nextElementSibling.style.display = "none"
            return
        }
        e.target.nextElementSibling.style.display = "flex"
    }
    const filterData = (value, data) => {
        let filteredData = data.filter(dataChecked => dataChecked.includes(value))
        filteredData.sort(function (a, b) {
            if (a.indexOf(value) <= b.indexOf(value)) { return -1 }
            else return 1
        })
        return filteredData
    }
    const onInputBlur = (e) => {
        e.target.classList.remove("red")
    }
    const onFinishArea = (e) => {
        e.preventDefault()
        let allInputs = e.target.getElementsByTagName("input")
        let allSelects = e.target.getElementsByTagName("select")
        if (allSelects[0].value === "" || allSelects[1].value === "" || allInputs[0].value === ""
            || allInputs[1].value === "" || allInputs[3].value === "") {
            if (allSelects[0].value === "") { allSelects[0].classList.add("red") }
            if (allSelects[1].value === "") { allSelects[1].classList.add("red") }
            if (allInputs[0].value === "") { allInputs[0].classList.add("red") }
            if (allInputs[1].value === "") { allInputs[1].classList.add("red") }
            if (allInputs[3].value === "") { allInputs[3].classList.add("red") }
            return
        }
        let addressData = {
            assetType: allSelects[0].value,
            assetCondition: allSelects[1].value,
            assetCity: allInputs[0].value,
            assetStreet: allInputs[1].value,
            assetNeighborhood: allInputs[2].value,
            assetHouseNumber: allInputs[3].value
        }
        onClickForward(addressData)
    }
    return (
        <div className={currentClassName}>
            <span className="number-icon">1</span>
            <h2>כתובת הנכס</h2>
            <form onSubmit={onFinishArea}>
                <h4>סימנו עבורך את שדות החובה. שלא נפספס פרט חשוב</h4>
                <div>
                    <label>סוג הנכס*</label>
                    <select onBlur={onInputBlur}>
                        <option value="">דירה או אולי פנטהאוז?</option>
                        <option value="דירה"> דירה</option>
                        <option value="בית-קרקע"> בית-קרקע</option>
                        <option value="גג/פנטהאוז">גג/פנטהאוז</option>
                    </select>
                </div>
                <div>
                    <label>מצב הנכס*</label>
                    <select onBlur={onInputBlur}>
                        <option value="">משופץ? חדש מקבלן? </option>
                        <option value="חדש מקבלן (לא גרו בו בכלל)">חדש מקבלן (לא גרו בו בכלל)</option>
                        <option value=" חדש (נכס בן עד 5 שנים)"> חדש (נכס בן עד 5 שנים) </option>
                        <option value=" משופץ (שופץ ב5 השנים האחרונות)"> משופץ (שופץ ב5 השנים האחרונות) </option>
                        <option value=" במצב שמור (במצב טוב, לא שופץ)"> במצב שמור (במצב טוב, לא שופץ) </option>
                    </select>
                </div>
                <div>
                    <label>ישוב*</label>
                    <input onBlur={onCityBlur} onInput={onLocationInput} type="text" autoComplete="off" placeholder="איפה נמצא הנכס?" className="text_input wider" />
                    <div className="dropdown_content location">
                        <LocationData currentSearchValue={currentSearchValue}
                            neighborhoodOptionsShown={[]}
                            cityOptionsShown={cityOptionsShown}
                            streetOptionsShown={[]}
                            selectOptionClick={selectOptionClick} />
                    </div>
                </div>
                <div>
                    <label>רחוב</label>
                    <input disabled={!didSelectCity} onBlur={onStreetBlur} onInput={onStreetInput} type="text" autoComplete="off" placeholder="הכנסת שם רחוב" className="text_input wider" />
                    <div className="dropdown_content location">
                        <LocationData currentSearchValue={currentSearchValue}
                            neighborhoodOptionsShown={[]}
                            cityOptionsShown={[]}
                            streetOptionsShown={streetOptionsShown}
                            selectOptionClick={selectOptionClick} />
                    </div>
                    <div className="mini-text">המידע הזה מגיע מגוף ממשלתי, אם הרחוב שלך לא מופיע, מומלץ לבחור רחוב קרוב אליך</div>
                </div>
                <div>
                    <label>שכונה</label>
                    <input disabled={true} type="text" className="text_input wider" value={neighborhoodShown} />
                    <div className="mini-text">המידע הזה מגיע מגוף ממשלתי ולא ניתן לשינוי</div>
                </div>
                <div>
                    <label>מס' בית</label>
                    <input onBlur={onInputBlur} disabled={!didSelectCity} type="text" className="text_input smaller-width" />
                </div>
                <div className="buttonsNextPreviousWrap">
                    <button type="submit" className="btnNext no-focus-outline">להמשיך לשלב הבא</button>
                </div>
            </form>
        </div>
    )
}

export default AddressData
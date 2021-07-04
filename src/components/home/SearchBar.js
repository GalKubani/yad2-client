import React, { useState } from 'react'
import { getLocationsFromDB } from '../../server/db'
import AdvancedSearch from './AdvancedSearch'
import AssetDropdown from './AssetDropdown'
import LocationData from './LocationData'
import PriceModal from './PriceModal'


const roomRange = ["הכל"]
for (let i = 1; i <= 12; i += 0.5) { roomRange.push(i) }
const SearchBar = ({ onSearchAttempt }) => {

    const [currentRoomRange, setCurrentRoomRange] = useState(roomRange)
    const [roomMinimumRange, setRoomMinimumRange] = useState()
    const [roomMaximumRange, setRoomMaximumRange] = useState()
    const [isPriceValid, setIsPriceValid] = useState(true)
    const [didClickOnAssets, setDidClickOnAssets] = useState(false)
    const [didClickAdvancedSearch, setDidClickAdvancedSearch] = useState(false)
    const [currentSearchValue, setCurrentSearchValue] = useState("")
    const [streetOptionsShown, setStreetOptionsShown] = useState([])
    const [cityOptionsShown, setCityOptionsShown] = useState([])
    const [neighborhoodOptionsShown, setNeighborhoodOptionsShown] = useState([])
    const [assetOptionsSelected, setAssetOptionsSelected] = useState("בחרו סוגי נכסים")

    const updateRoomRangeArray = (min = roomMinimumRange, max = roomMaximumRange) => {
        let newRoomRange = []
        if (min === "הכל") { return roomRange }
        if (min === 1) { newRoomRange.push("הכל") }
        if (min < 1) { min = 1 }
        min *= 1
        for (; min <= max; min += 0.5) { newRoomRange.push(min) }
        if (newRoomRange.length === 1) { return roomRange }
        return newRoomRange
    }
    const onRoomsClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let dropdownContent = e.target.nextElementSibling?.classList.contains("dropdown_content") ? e.target.nextElementSibling : undefined
            || e.target.parentElement.nextElementSibling?.classList.contains("dropdown_content") ? e.target.parentElement.nextElementSibling : undefined
                || e.target.nextElementSibling.nextElementSibling?.classList.contains("dropdown_content") ? e.target.nextElementSibling.nextElementSibling : undefined
        let arrow = e.target.firstElementChild?.classList.contains("arrow") ?
            e.target.firstElementChild : undefined ||
                e.target.classList.contains("arrow") ? e.target : e.target.nextElementSibling
        if (arrow.classList.contains("arrow-click")) {
            arrow.classList.remove("arrow-click")
            dropdownContent.style.display = "none"
        }
        else {
            arrow.classList.add("arrow-click")
            dropdownContent.style.display = "flex"
        }
    }
    const onAssetsClick = (e) => {
        setDidClickOnAssets(!didClickOnAssets)
        let arrow = e.target.firstElementChild
        if (arrow.classList.contains("arrow-click")) { arrow.classList.remove("arrow-click") }
        else { arrow.classList.add("arrow-click") }
    }
    const onAdvancedSearchClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDidClickAdvancedSearch(!didClickAdvancedSearch)
    }
    const updateRoomRange = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let currentValue = e.target.innerHTML
        let rangeData = e.target.parentElement.parentElement
        let arrow = rangeData.parentElement.previousElementSibling.firstElementChild
        rangeData.parentElement.previousElementSibling.innerHTML = ""
        rangeData.parentElement.previousElementSibling.appendChild(arrow)
        if (rangeData.classList.contains("inside")) {
            setRoomMinimumRange(currentValue)
            setCurrentRoomRange(updateRoomRangeArray(currentValue, 12))
            if (roomMaximumRange === "הכל" || roomMaximumRange === undefined) { rangeData.parentElement.previousElementSibling.innerHTML += "מ - " + currentValue }
            else {
                if (currentValue !== roomMaximumRange) { rangeData.parentElement.previousElementSibling.innerHTML += currentValue + " - " + roomMaximumRange }
                else { rangeData.parentElement.previousElementSibling.innerHTML += currentValue }
            }
        }
        else {
            setRoomMaximumRange(currentValue)
            setCurrentRoomRange(updateRoomRangeArray(1, currentValue))
            if (roomMinimumRange === "הכל" || roomMinimumRange === undefined) { rangeData.parentElement.previousElementSibling.innerHTML += "עד - " + currentValue }
            else {
                if (currentValue !== roomMinimumRange) { rangeData.parentElement.previousElementSibling.innerHTML += roomMinimumRange + " - " + currentValue }
                else { rangeData.parentElement.previousElementSibling.innerHTML += currentValue }
            }
        }
        if (currentValue === "הכל" && (roomMinimumRange === "הכל" || roomMinimumRange === undefined) && (roomMaximumRange === "הכל" || roomMaximumRange === undefined)) {
            rangeData.parentElement.previousElementSibling.innerHTML = ""
            rangeData.parentElement.previousElementSibling.appendChild(arrow)
            rangeData.parentElement.previousElementSibling.innerHTML += "חדרים"
        }
        rangeData.style.display = "none"
        rangeData.previousElementSibling.previousElementSibling.value = currentValue
        rangeData.previousElementSibling.classList.remove("arrow-click")
    }
    const onSearchbarClick = (e) => {
        e.preventDefault()
        if (e.target.classList.contains("checkbox-label") || e.target.parentElement.classList.contains("checkbox-label")) { return }
        let dropdown = document.getElementsByClassName("dropdown_content")
        let arrows = document.getElementsByClassName("arrow-click")
        for (let arrow of arrows) { arrow.classList.remove("arrow-click") }
        for (let content of dropdown) { content.style.display = "none" }
    }
    const selectOptionClick = (e) => {
        e.stopPropagation()
        // will nn to account for which category was selected
        if (e.target.classList.contains("location-category")) {
            e.target.parentElement.parentElement.parentElement.previousElementSibling.value = e.target.previousElementSibling.innerText
            e.target.parentElement.parentElement.parentElement.style.display = "none"
            return
        }
        e.target.parentElement.parentElement.previousElementSibling.value = e.target.children[0].innerText
        e.target.parentElement.parentElement.style.display = "none"
    }
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
            setNeighborhoodOptionsShown(res.neighborhoods.splice(0, 4))
            setCityOptionsShown(res.cityNames.splice(0, 4))
            setStreetOptionsShown(res.streetNames.splice(0, 4))
        })
        e.target.nextElementSibling.style.display = "flex"
    }
    const onMaxPriceEntry = (e) => {
        if (e.target.value < 30000 && e.target.value) { setIsPriceValid(false) }
        else { setIsPriceValid(true) }
    }
    const closeModal = () => {
        setIsPriceValid(true)
    }

    const onReturnData = (data) => {
        let counter = 0
        let dataNames = ["כל סוגי הנכסים", "דירות", "בתים", "גג/פנטהאוז"]
        let dataSent = []
        data.map((value, i) => {
            if (value) {
                counter++
                dataSent.push(dataNames[i])
            }
            return ("")
        })
        if (counter === 0) { setAssetOptionsSelected("בחרו סוגי נכסים") }
        if (counter > 1) { setAssetOptionsSelected((counter === 4 ? 3 : counter) + " סוגי נכסים") }
        else { setAssetOptionsSelected(dataSent[0]) }

        // will also nn to place value inside state to use once form is submitted
    }
    const onAttemptSearch = async (e) => {
        e.preventDefault()

    }
    return (
        <div onClick={onSearchbarClick}>
            <form onSubmit={onAttemptSearch} className="search-bar">
                <div className="search-bar-header">
                    <h3>איזה נכס למכירה תרצו לחפש?</h3>
                    <button className="searchbar-header-button" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M19.364 4.636a2 2 0 0 1 0 2.828a7 7 0 0 1 -1.414 7.072l-2.122 2.12a4 4 0 0 0 -.707 3.536l-11.313 -11.312a4 4 0 0 0 3.535 -.707l2.121 -2.123a7 7 0 0 1 7.072 -1.414a2 2 0 0 1 2.828 0z"></path>
                            <path d="M7.343 12.414l-.707 .707a3 3 0 0 0 4.243 4.243l.707 -.707"></path>
                        </svg>
                        קבלו התראות על חיפוש במייל
                    </button>
                </div>


                <ul className="search-columns">
                    <li className="search-column">
                        <label>חפשו אזור, עיר, שכונה או רחוב</label>
                        <input onInput={onLocationInput} type="text" autoComplete="off" placeholder="לדוגמה: רמות, באר שבע" className="text_input" />
                        <div className="dropdown_content location">
                            <LocationData currentSearchValue={currentSearchValue}
                                neighborhoodOptionsShown={neighborhoodOptionsShown}
                                cityOptionsShown={cityOptionsShown}
                                streetOptionsShown={streetOptionsShown}
                                selectOptionClick={selectOptionClick} />
                        </div>
                    </li>
                    <li className="search-column">
                        <label>סוג נכס</label>
                        <button onClick={onAssetsClick} className="text_input placeholder bigger">{assetOptionsSelected} <div className="arrow">^</div></button>
                        {didClickOnAssets ? <AssetDropdown onReturnData={onReturnData} /> : ""}
                    </li>
                    <li className="search-column">
                        <div><label>חדרים</label></div>
                        <button onClick={onRoomsClick} className="text_input smaller placeholder"><div className="arrow">^</div> חדרים </button>
                        <div className="dropdown_content room-range">
                            <input onClick={onRoomsClick} type="text" autoComplete="off" placeholder="מ-" className="text_input" />
                            <div onClick={onRoomsClick} className="arrow from">^</div>
                            <div className="dropdown_content inside">
                                <ul className="room-list">
                                    {currentRoomRange.map((value) => {
                                        return (<li onClick={updateRoomRange} value={value} className="roomlist-item" key={value}>{value}</li>)
                                    })}
                                </ul>
                            </div>
                            <input onClick={onRoomsClick} type="text" autoComplete="off" placeholder="עד-" className="text_input" />
                            <div onClick={onRoomsClick} className="arrow max">^</div>
                            <div className="dropdown_content  inside-left">
                                <ul className="room-list">
                                    {currentRoomRange.map((value) => {
                                        return (<li onClick={updateRoomRange} className="roomlist-item" key={value}>{value}</li>)
                                    })}
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="search-column">
                        <div><label>מחיר</label></div>
                        <div className="price-wrapper">
                            <input type="text" autoComplete="off" placeholder="ממחיר" inputMode="numeric" maxLength="10" className="text_input smaller" />
                            <input onBlur={onMaxPriceEntry} type="text" autoComplete="off" placeholder="עד מחיר" inputMode="numeric" maxLength="10" className="text_input smaller" />
                            {isPriceValid ? "" : <PriceModal closeModal={closeModal} />}
                        </div>
                    </li>
                    <li className="search-column advanced-search">
                        <button onClick={onAdvancedSearchClick} className="advanced-search-button">חיפוש מתקדם</button>
                        {didClickAdvancedSearch ? <AdvancedSearch /> : ""}
                    </li>
                    <li className="search-column">
                        <button type="submit" className="default-button">
                            <svg className="svg-search-icon" role="img" viewBox="0 0 19.9 19.7">
                                <g fill="none" stroke="white"><path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" /><circle cx="8" cy="8" r="7" /></g>
                            </svg>     <span>חיפוש</span>
                        </button>

                    </li>
                </ul>
            </form>
        </div>
    )
}

export default SearchBar
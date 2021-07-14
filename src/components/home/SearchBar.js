import React, { useState } from 'react'
import { getLocationsFromDB } from '../../server/db'
import RangeDropdown from '../main/RangeDropdown'
import AdvancedSearch from './AdvancedSearch'
import AssetDropdown from './AssetDropdown'
import LocationData from './LocationData'
import PriceModal from './PriceModal'


const roomRange = ["הכל"]
for (let i = 1; i <= 12; i += 0.5) { roomRange.push(i) }
const SearchBar = ({ onSearchAttempt }) => {
    const [minimumRange, setMinimumRange] = useState()
    const [maximumRange, setMaximumRange] = useState()
    const [isPriceValid, setIsPriceValid] = useState(true)
    const [didClickOnAssets, setDidClickOnAssets] = useState(false)
    const [didClickAdvancedSearch, setDidClickAdvancedSearch] = useState(false)
    const [currentSearchValue, setCurrentSearchValue] = useState("")
    const [streetOptionsShown, setStreetOptionsShown] = useState([])
    const [cityOptionsShown, setCityOptionsShown] = useState([])
    const [neighborhoodOptionsShown, setNeighborhoodOptionsShown] = useState([])
    const [assetOptionsSelected, setAssetOptionsSelected] = useState("בחרו סוגי נכסים")
    const [assetSearchOptions, setAssetSearchOption] = useState([])

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
        let dataNames = ["כל סוגי הנכסים", "דירה", "בית-קרקע", "גג/פנטהאוז"]
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
        setAssetSearchOption(dataSent)
    }
    const onAttemptSearch = (e) => {
        e.preventDefault()
        let allInputs = document.getElementsByClassName("search-bar")[0].getElementsByClassName("text_input")
        let searchData = {
            locationData: allInputs[0].value,
            minimumPriceRange: allInputs[5].value,
            maximumPriceRange: allInputs[6].value,
            assetTypeSearchOptions: assetSearchOptions,
            minimumRoomRange: minimumRange,
            maximumRoomRange: maximumRange,
        }
        onSearchAttempt(searchData)
    }
    const onConfirmAdvancedSearch = (searchData) => {
        let allInputs = document.getElementsByClassName("search-bar")[0].getElementsByClassName("text_input")
        let regSearchData = {
            locationData: allInputs[0].value,
            minimumPriceRange: allInputs[5].value,
            maximumPriceRange: allInputs[6].value,
            assetTypeSearchOptions: assetSearchOptions,
            minimumRoomRange: minimumRange,
            maximumRoomRange: maximumRange,
        }
        let advancedSearchData = { ...searchData, ...regSearchData }
        onSearchAttempt(advancedSearchData)
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
                    <RangeDropdown minimumRange={minimumRange} setMinimumRange={setMinimumRange} maximumRange={maximumRange} setMaximumRange={setMaximumRange} dropName="חדרים" dropInterval={0.5} optionRange={roomRange} />
                    <li className="search-column">
                        <div><label>מחיר</label></div>
                        <div className="price-wrapper">
                            <input type="text" autoComplete="off" placeholder="ממחיר" inputMode="numeric" maxLength="10" className="text_input smaller" />
                            <input onBlur={onMaxPriceEntry} type="text" autoComplete="off" placeholder="עד מחיר" inputMode="numeric" maxLength="10" className="text_input smaller" />
                            {isPriceValid ? "" : <PriceModal closeModal={closeModal} />}
                        </div>
                    </li>
                    <li className="search-column">
                        <button onClick={onAttemptSearch} type="submit" className="default-button">
                            <svg className="svg-search-icon" role="img" viewBox="0 0 19.9 19.7">
                                <g fill="none" stroke="white"><path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" /><circle cx="8" cy="8" r="7" /></g>
                            </svg>     <span>חיפוש</span>
                        </button>
                    </li>
                    <li className="search-column advanced-search">
                        <button onClick={onAdvancedSearchClick} className="advanced-search-button">חיפוש מתקדם</button>
                        {didClickAdvancedSearch ? <AdvancedSearch onConfirmAdvancedSearch={onConfirmAdvancedSearch} /> : ""}
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default SearchBar
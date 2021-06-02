import React, { useState } from 'react'
import AdvancedSearch from './AdvancedSearch'


const roomRange = ["הכל"]
for (let i = 1; i <= 12; i += 0.5) { roomRange.push(i) }
const SearchBar = () => {

    const [currentRoomRange, setCurrentRoomRange] = useState(roomRange)
    const [roomMinimumRange, setRoomMinimumRange] = useState()
    const [roomMaximumRange, setRoomMaximumRange] = useState()
    const [didClickAdvancedSearch, setDidClickAdvancedSearch] = useState(false)

    const updateRoomRangeArray = (min = roomMinimumRange, max = roomMaximumRange) => {
        let newRoomRange = []
        console.log(min)
        console.log(max)
        if (min === "הכל") { return roomRange }
        if (min === 1) { newRoomRange.push("הכל") }
        if (min < 1) { min = 1 }
        min *= 1
        for (; min <= max; min += 0.5) {
            newRoomRange.push(min)
        }
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
        setDidClickAdvancedSearch(false)
        let dropdown = document.getElementsByClassName("dropdown_content")
        let arrows = document.getElementsByClassName("arrow-click")
        for (let arrow of arrows) { arrow.classList.remove("arrow-click") }
        for (let content of dropdown) { content.style.display = "none" }
    }
    return (
        <div onClick={onSearchbarClick}>
            <form className="search-bar">
                <h3>איזה נכס למכירה תרצו לחפש?</h3>
                <ul className="search-columns">
                    <li className="search-column">
                        <label>חפשו אזור, עיר, שכונה או רחוב</label>
                        <input type="text" autoComplete="off" placeholder="לדוגמה: רמות, באר שבע" className="text_input" />
                        {/* will nn to implement search somehow */}
                    </li>
                    <li className="search-column">
                        <label>סוג נכס</label>
                        <button onClick={onRoomsClick} className="text_input placeholder bigger">בחרו סוג נכסים <div className="arrow">^</div></button>
                        {/* will nn to add checkbox as dropped menu for all options, maybe new component */}
                        <div className="dropdown_content">
                            <ul>
                                <li className="asset-checkbox">

                                </li>
                                <li className="asset-checkbox">

                                </li>
                                <li className="asset-checkbox">

                                </li>
                                <li className="asset-checkbox">

                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="search-column">
                        <div><label>חדרים</label></div>
                        <button onClick={onRoomsClick} className="text_input smaller placeholder"><div className="arrow">^</div> חדרים </button>
                        <div className="dropdown_content">
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
                        {/* will nn to make sure input will be valid */}
                        <div className="price-wrapper">
                            <input type="text" autoComplete="off" placeholder="ממחיר" inputMode="numeric" maxLength="10" className="text_input smaller" />
                            <input type="text" autoComplete="off" placeholder="עד מחיר" inputMode="numeric" maxLength="10" className="text_input smaller" />
                        </div>
                    </li>
                    <li className="search-column advanced-search">
                        <button onClick={onAdvancedSearchClick} className="advanced-search-button">חיפוש מתקדם</button>
                        {didClickAdvancedSearch ? <AdvancedSearch /> : ""}
                    </li>
                    <li className="search-columns">
                        <button type="submit" className="default-button">חיפוש</button>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default SearchBar
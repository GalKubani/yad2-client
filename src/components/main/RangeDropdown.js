import React, { useState } from 'react'

const RangeDropdown = ({ labelClassName = "", dropName, dropInterval, optionRange, minimumRange, setMinimumRange, maximumRange, setMaximumRange }) => {

    const [currentRoomRange, setCurrentRoomRange] = useState(optionRange)


    const updateRoomRangeArray = (min = minimumRange, max = maximumRange) => {
        let newRoomRange = []
        if (min === "הכל") { return optionRange }
        if (min === 1) { newRoomRange.push("הכל") }
        if (min < 1) { min = 1 }
        min *= 1
        for (; min <= max; min += dropInterval) { newRoomRange.push(min) }
        if (newRoomRange.length === 1) { return optionRange }
        return newRoomRange
    }
    const onRoomsClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let dropdownContent = e.target.nextElementSibling?.classList.contains("dropdown_content") ? e.target.nextElementSibling : undefined
            || e.target.parentElement.nextElementSibling?.classList.contains("dropdown_content") ? e.target.parentElement.nextElementSibling : undefined
                || e.target.nextElementSibling.nextElementSibling?.classList.contains("dropdown_content") ? e.target.nextElementSibling.nextElementSibling : undefined
        let arrow
        console.log(e.target)
        if (e.target.classList.contains("arrow-wrap")) { arrow = e.target }
        else if (e.target.firstElementChild?.classList.contains("arrow-wrap")) { arrow = e.target.firstElementChild }
        else { arrow = e.target.nextElementSibling }
        if (!arrow) { arrow = e.target.previousElementSibling }
        if (arrow.classList.contains("down")) {
            arrow.classList.remove("down")
            arrow.classList.add("up")
            dropdownContent.style.display = "none"
        }
        else {
            arrow.classList.add("down")
            arrow.classList.remove("up")
            dropdownContent.style.display = "flex"
        }
    }
    const updateRoomRange = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let currentValue = e.target.innerHTML
        let rangeData = e.target.parentElement.parentElement
        let currentTarget = rangeData.parentElement.previousElementSibling
        let valueSpan = currentTarget.lastElementChild
        valueSpan.innerHTML = ""
        if (rangeData.classList.contains("inside")) {
            setMinimumRange(currentValue)
            setCurrentRoomRange(updateRoomRangeArray(currentValue, 12))
            if (maximumRange === "הכל" || maximumRange === undefined) { valueSpan.innerHTML += "מ - " + currentValue }
            else {
                if (currentValue !== maximumRange) { valueSpan.innerHTML += currentValue + " - " + maximumRange }
                else { valueSpan.innerHTML += currentValue }
            }
        }
        else {
            setMaximumRange(currentValue)
            setCurrentRoomRange(updateRoomRangeArray(1, currentValue))
            if (minimumRange === "הכל" || minimumRange === undefined) { valueSpan.innerHTML += "עד - " + currentValue }
            else {
                if (currentValue !== minimumRange) { valueSpan.innerHTML += minimumRange + " - " + currentValue }
                else { valueSpan.innerHTML += currentValue }
            }
        }
        if (currentValue === "הכל" && (minimumRange === "הכל" || minimumRange === undefined) && (maximumRange === "הכל" || maximumRange === undefined)) {
            valueSpan.innerHTML = ""
            valueSpan.innerHTML += dropName
        }
        rangeData.style.display = "none"
        rangeData.previousElementSibling.previousElementSibling.value = currentValue
        rangeData.previousElementSibling.classList.remove("arrow-click")
    }
    return (
        <li className="search-column">
            <div><label className={labelClassName}>{dropName}</label></div>
            <button onClick={onRoomsClick} className="text_input smaller placeholder">
                <div className="arrow-wrap up"></div> <span className="range-value">{dropName}</span>
            </button>
            <div className="dropdown_content room-range">
                <input onClick={onRoomsClick} type="text" autoComplete="off" placeholder="מ-" className="text_input" />
                <div onClick={onRoomsClick} className="arrow-wrap relative-pos up"></div>
                <div className="dropdown_content inside">
                    <ul className="room-list">
                        {currentRoomRange.map((value) => {
                            return (<li onClick={updateRoomRange} value={value} className="roomlist-item" key={value}>{value}</li>)
                        })}
                    </ul>
                </div>
                <input onClick={onRoomsClick} type="text" autoComplete="off" placeholder="עד-" className="text_input" />
                <div onClick={onRoomsClick} className="arrow-wrap relative-pos up"></div>
                <div className="dropdown_content  inside-left">
                    <ul className="room-list">
                        {currentRoomRange.map((value) => {
                            return (<li onClick={updateRoomRange} className="roomlist-item" key={value}>{value}</li>)
                        })}
                    </ul>
                </div>
            </div>
        </li>
    )
}
export default RangeDropdown
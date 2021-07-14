import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import RangeDropdown from '../main/RangeDropdown'


const checkboxOptions = ["מיזוג", "דוד שמש", "ריהוט", "מעלית", "ממד", "משופצת"]
const floorsOption = ["הכל"]
for (let i = 1; i <= 12; i += 1) { floorsOption.push(i) }
const AdvancedSearch = ({ onConfirmAdvancedSearch }) => {

    const [dateValue, onChange] = useState(new Date());
    const [minimumRange, setMinimumRange] = useState()
    const [maximumRange, setMaximumRange] = useState()
    const [isCalendarVisible, setIsCalendarVisible] = useState(false)
    const onBoxClick = (e) => {
        const sharedParentElement = e.target.parentElement;
        sharedParentElement.children[0].checked = !sharedParentElement.children[0].checked
        sharedParentElement.children[1].classList.toggle("checkmark-checked")
    }
    useEffect(() => { setIsCalendarVisible(false) }, [dateValue])
    const onClearForm = (e) => {
        e.preventDefault()
        onChange(new Date())
        setMinimumRange()
        setMaximumRange()
        let allCheckboxes = document.getElementsByClassName("advanced-search-container")[0].getElementsByClassName("checkbox")
        for (let box of allCheckboxes) {
            box.checked = false
            box.nextElementSibling.classList.remove("checkmark-checked")
        }
        let floorButton = document.getElementsByClassName("text_input smaller placeholder")[1]
        let insideTextInputs = document.getElementsByClassName("dropdown_content room-range")[1].getElementsByTagName("input")
        insideTextInputs[0].value = ""
        insideTextInputs[1].value = ""
        floorButton.children[1].innerHTML = "קומה"
        let sizeInputs = document.getElementsByClassName("range-input")[0].getElementsByTagName("input")
        sizeInputs[0].value = ""
        sizeInputs[1].value = ""
    }
    const onAdvancedSearch = (e) => {
        let assetCharecteristics = []
        let sizeInputs = document.getElementsByClassName("range-input")[0].getElementsByTagName("input")
        let allCheckboxes = document.getElementsByClassName("advanced-search-container")[0].getElementsByClassName("checkbox")
        let floorInputs = document.getElementsByClassName("dropdown_content room-range")[1].getElementsByTagName("input")
        for (let box of allCheckboxes) {
            if (box.checked) {
                assetCharecteristics.push(box.value)
            }
        }
        let searchData = {
            assetCharecteristics,
            minimumSizeRange: sizeInputs[0].value,
            maximumSizeRange: sizeInputs[1].value,
            minimumFloorRange: floorInputs[0].value,
            maximumFloorRange: floorInputs[1].value,
            dateOfEntry: dateValue.toLocaleDateString("he-IL") !== new Date().toLocaleDateString("he-IL") ? dateValue : ""
        }
        onConfirmAdvancedSearch(searchData)
    }
    return (
        <div className="dropdown-content advanced-search-container">
            <span className="advance-search-title">מאפייני דירה</span>
            <ul className="advance-search-row">
                {checkboxOptions.map((option) => {
                    return (
                        <li key={option} className="advance-checkbox-option">
                            <input type="checkbox" className="checkbox" value={option} />
                            <span onClick={onBoxClick} className="checkmark"></span>
                            <span onClick={onBoxClick} className="cb_text"> {option}</span>
                        </li>
                    )
                })}
            </ul>
            <ul className="advance-search-row">
                <li className="range-input-wrapper">
                    <label className="label-title">גודל דירה (במ"ר)</label>
                    <div className="range-input">
                        <input placeholder="מ-"></input>
                        <input placeholder="עד-"></input>
                    </div>
                </li>
                <RangeDropdown minimumRange={minimumRange} setMinimumRange={setMinimumRange} maximumRange={maximumRange} setMaximumRange={setMaximumRange} labelClassName={"label-title"} dropName="קומה" dropInterval={1} optionRange={floorsOption} />
                <li className="date-input-wrapper">
                    <label className="label-title">תאריך כניסה</label>
                    <input placeholder="החל מ- הזינו תאריך" onClick={() => { setIsCalendarVisible(!isCalendarVisible) }} onChange={() => { }} type="text" autoComplete="off" value={dateValue.toLocaleDateString("he-IL", { month: "2-digit", day: "2-digit" })} className="text_input wider" />
                    {isCalendarVisible && <div className="absolute-cal">  <Calendar onChange={onChange} minDate={new Date()} locale="he-IL" calendarType="Hebrew" /></div>}
                </li>
            </ul>
            <ul className="advance-search-row">
                <li className="buttons-container">
                    <button onClick={onAdvancedSearch} className="default-button">
                        <svg className="svg-search-icon" role="img" viewBox="0 0 19.9 19.7">
                            <g fill="none" stroke="white"><path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" /><circle cx="8" cy="8" r="7" /></g>
                        </svg>     <span>חיפוש</span>
                    </button>
                    <div className="clear-form-wrap">   <button onClick={onClearForm}>נקה</button>  </div>
                </li>
            </ul>
        </div>
    )
}

export default AdvancedSearch
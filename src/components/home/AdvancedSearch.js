import React from 'react'


const checkboxOptions = ["חניה", "מעלית", "מרפסת", "מיזוג", "משופצת", "מרוהטת"]
const AdvancedSearch = () => {



    const onBoxClick = (e) => {

        e.target.parentElement.children[0].checked = !e.target.parentElement.children[0].checked

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
            <ul className="advance-search-row"></ul>
            <ul className="advance-search-row"></ul>
        </div>
    )
}

export default AdvancedSearch
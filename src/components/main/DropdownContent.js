import React from 'react'

const DropdownContent = ({ name, selectOptionClick, dropdownData }) => {

    const onItemClick = (e) => {
        e.preventDefault()
        selectOptionClick(e.target.innerHTML)
    }
    return (
        <div className={"dropdown_content " + name}>
            <ul className="location-list">
                {dropdownData.map((city) => {
                    return (
                        <li onClick={onItemClick} className="location-option" key={city}>
                            {city}
                        </li>
                    )
                })}
            </ul>
        </div>


    )
}

export default DropdownContent
import React from 'react'

const LocationData = ({ selectOptionClick, currentSearchValue, neighborhoodOptionsShown, cityOptionsShown, streetOptionsShown }) => {
    return (
        <ul className="location-list">
            {neighborhoodOptionsShown.length > 0 ? <li className="category-title">שכונה</li> : ""}
            {neighborhoodOptionsShown.map((option) => {
                let optionNameAndCity = option.split("//")
                let optionName = optionNameAndCity[0].split("שכ")[1].trim()
                let jsx
                if (optionName.indexOf(currentSearchValue) === 0) {
                    optionName = optionName.slice(currentSearchValue.length)
                    jsx = (<span> <span className="bold">{currentSearchValue}</span>{optionName}, {optionNameAndCity[1]} </span>)
                }
                else if (optionName.indexOf(currentSearchValue) === optionName.length - (currentSearchValue.length)) {
                    optionName = optionName.slice(0, optionName.length - (currentSearchValue.length))
                    jsx = (<span> {optionName}<span className="bold">{currentSearchValue}</span>, {optionNameAndCity[1]}</span>)
                }
                else {
                    if (optionName.includes(currentSearchValue)) {
                        optionName = optionName.split(currentSearchValue, 2)
                        jsx = (<span>{optionName[0]}<span className="bold">{currentSearchValue}</span>{optionName[1]}, {optionNameAndCity[1]}</span>)
                    }
                    else { return }
                }
                return (
                    <li onClick={(selectOptionClick)} key={option} className="location-option">
                        {jsx}
                        <div className="location-category">שכונה</div>
                    </li>)
            })}
            {cityOptionsShown.length > 0 ? <li className="category-title">עיר</li> : ""}
            {cityOptionsShown.map((option) => {
                let optionName = option
                let jsx
                if (optionName.indexOf(currentSearchValue) === 0) {
                    optionName = optionName.slice(currentSearchValue.length)
                    jsx = (<span> <span className="bold">{currentSearchValue}</span>{optionName} </span>)
                }
                else if (optionName.indexOf(currentSearchValue) === optionName.length - (currentSearchValue.length)) {
                    optionName = optionName.slice(0, optionName.length - (currentSearchValue.length))
                    jsx = (<span> {optionName}<span className="bold">{currentSearchValue}</span></span>)
                }
                else {
                    if (optionName.includes(currentSearchValue)) {
                        optionName = optionName.split(currentSearchValue, 2)
                        jsx = (<span>{optionName[0]}<span className="bold">{currentSearchValue}</span>{optionName[1]}</span>)
                    }
                    else { return }
                }
                return (
                    <li onClick={(selectOptionClick)} key={option} className="location-option">
                        {jsx}
                        <div className="location-category">עיר</div>
                    </li>)
            })}
            {streetOptionsShown.length > 0 ? <li className="category-title">רחוב</li> : ""}
            {streetOptionsShown.map((option) => {
                if (option.length > 26) { return }
                let optionNameAndCity = option.split("//")
                let optionName = optionNameAndCity[0]
                let jsx
                if (optionName.indexOf(currentSearchValue) === 0) {

                    optionName = optionName.slice(currentSearchValue.length)
                    jsx = (<span> <span className="bold">{currentSearchValue}</span>{optionName}, {optionNameAndCity[1]} </span>)
                }
                else if (optionName.indexOf(currentSearchValue) === optionName.length - (currentSearchValue.length)) {
                    optionName = optionName.slice(0, optionName.length - (currentSearchValue.length))
                    jsx = (<span> {optionName}<span className="bold">{currentSearchValue}</span>, {optionNameAndCity[1]}</span>)
                }
                else {
                    if (optionName.includes(currentSearchValue)) {
                        optionName = optionName.split(currentSearchValue, 2)
                        jsx = (<span>{optionName[0]}<span className="bold">{currentSearchValue}</span>{optionName[1]}, {optionNameAndCity[1]}</span>)
                    }
                    else { return }
                }
                return (
                    <li onClick={(selectOptionClick)} key={option} className="location-option">
                        {jsx}
                        <div className="location-category">רחוב</div>
                    </li>)
            })}
        </ul>
    )
}

export default LocationData
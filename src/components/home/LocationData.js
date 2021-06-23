import React from 'react'
import SearchOptionBoldValue from './SearchOptionBoldValue.js'

const LocationData = ({ selectOptionClick, currentSearchValue, neighborhoodOptionsShown, cityOptionsShown, streetOptionsShown }) => {
    return (
        <ul className="location-list">
            {neighborhoodOptionsShown.length > 0 ? <li className="category-title">שכונה</li> : ""}
            {neighborhoodOptionsShown.map((option) => {
                let optionNameAndCity = option.split("//")
                let optionName = optionNameAndCity[0].split("שכ")[1].trim()

                return (
                    <li onClick={(selectOptionClick)} key={option} className="location-option">
                        {<SearchOptionBoldValue optionName={optionName} optionNameAndCity={optionNameAndCity} currentSearchValue={currentSearchValue} />}
                        <div className="location-category">שכונה</div>
                    </li>)
            })}
            {cityOptionsShown.length > 0 ? <li className="category-title">עיר</li> : ""}
            {cityOptionsShown.map((option) => {
                let optionName = option
                return (
                    <li onClick={(selectOptionClick)} key={option} className="location-option">
                        {<SearchOptionBoldValue optionName={optionName} optionNameAndCity={["", ""]} currentSearchValue={currentSearchValue} />}
                        <div className="location-category">עיר</div>
                    </li>)
            })}
            {streetOptionsShown.length > 0 ? <li className="category-title">רחוב</li> : ""}
            {streetOptionsShown.map((option) => {
                if (option.length > 26) { return ("") }
                let optionNameAndCity = option.split("//")
                let optionName = optionNameAndCity[0]
                return (
                    <li onClick={(selectOptionClick)} key={option} className="location-option">
                        {<SearchOptionBoldValue optionName={optionName} optionNameAndCity={optionNameAndCity} currentSearchValue={currentSearchValue} />}
                        <div className="location-category">רחוב</div>
                    </li>)
            })}
        </ul>
    )
}

export default LocationData
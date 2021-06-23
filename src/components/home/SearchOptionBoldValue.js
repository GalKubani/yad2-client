import React from 'react'

const SearchOptionBoldValue = ({ optionName, currentSearchValue, optionNameAndCity }) => {
    let jsx = ""
    if (optionName.indexOf(currentSearchValue) === 0) {
        optionName = optionName.slice(currentSearchValue.length)
        jsx = <span> <span className="bold">{currentSearchValue}</span>{optionName} {optionNameAndCity[1] ? "," + optionNameAndCity[1] : ""} </span>
    }
    else if (optionName.indexOf(currentSearchValue) === optionName.length - (currentSearchValue.length)) {
        optionName = optionName.slice(0, optionName.length - (currentSearchValue.length))
        jsx = <span> {optionName}<span className="bold">{currentSearchValue}</span> {optionNameAndCity[1] ? "," + optionNameAndCity[1] : ""}</span>
    }
    else if (optionName.includes(currentSearchValue)) {
        optionName = optionName.split(currentSearchValue, 2)
        jsx = <span>{optionName[0]}<span className="bold">{currentSearchValue}</span>{optionName[1]} {optionNameAndCity[1] ? "," + optionNameAndCity[1] : ""}</span>
    }
    return (jsx)
}

export default SearchOptionBoldValue
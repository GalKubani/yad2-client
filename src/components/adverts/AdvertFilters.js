import React, { useEffect, useState } from 'react'

const AdvertsFilters = ({ advertCount, updateFilter, updateAdvertSorting }) => {
    const [activeFilters, setActiveFilters] = useState([false, false])

    useEffect(() => {
        updateFilter(activeFilters)
    }, [activeFilters])

    const onFilterButtonClick = (e) => {
        e.preventDefault()

        let button = e.target
        let currentFilters = activeFilters
        if (!button.classList.contains("active-button")) {
            button.classList.add("active-button")
            if (button.name === "price") { currentFilters[0] = true }
            else { currentFilters[1] = true }
        }
        else {
            button.classList.remove("active-button")
            if (button.name === "price") { currentFilters[0] = false }
            else { currentFilters[1] = false }
        }
        setActiveFilters([...currentFilters])
    }
    const onSelectChange = (e) => {
        updateAdvertSorting(e.target.value)
    }
    return (
        <div>
            <div className="filter-title">
                <span>נדל״ן למכירה</span>
                <div className="advert-counter"> מציג {advertCount} מודעות  </div>
            </div>
            <div className="filter-content">
                <div className="advert-sort-container">
                    <label>מיין לפי</label>
                    <select onChange={onSelectChange} className="filter-select">
                        <option value="date">לפי תאריך</option>
                        <option value="price-down">מחיר - מהזול ליקר</option>
                        <option value="price-up">מחיר - מהיקר לזול</option>
                    </select>
                </div>
                <div className="advert-filters-wrapper">
                    <label>הצג מודעות</label>
                    <button name="price" className="filter-button" onClick={onFilterButtonClick}>₪ עם מחיר</button>
                    <button name="picture" className="filter-button" onClick={onFilterButtonClick}>עם תמונה</button>
                </div>
            </div>
        </div>
    )
}

export default AdvertsFilters
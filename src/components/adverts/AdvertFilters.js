import React from 'react'

const AdvertsFilters = ({ advertCount, updateFilter, updateAdvertSorting }) => {



    const onFilterButtonClick = (e) => {
        e.preventDefault()
        let button = e.target
        if (!button.classList.contains("active-button")) { button.classList.add("active-button") }
        else { button.classList.remove("active-button") }
        updateFilter(button.name)
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
                    <select className="filter-select">
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
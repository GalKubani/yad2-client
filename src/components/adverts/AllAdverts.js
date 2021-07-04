import React, { useContext, useState } from 'react'
import RecentlySold from './RecentlySold'
import AdvertsDisplay from './AdvertsDisplay'
import AdvertsFilters from './AdvertFilters'
import { AdvertContext } from '../../context/AdvertContext'

const AllAdverts = ({ currentlyShownAdverts, setCurrentlyShownAdverts }) => {
    const { allAdverts } = useContext(AdvertContext)


    const updateFilter = (filterOptions) => {
        // filter options are either with price, or with pictures, or both
        // will nn to filter all adverts and save result to currentlyshown
        // filter options selected from filters will be used to filter the adverts
    }
    const updateAdvertSorting = (sortingOption) => {
        // will sort the adverts according to the option selected, default is by last update
        // other sorting is either high to low price, or other way around
    }
    console.log(currentlyShownAdverts)
    return (
        <div className="adverts-display-container">
            <div className="adverts-container">
                <AdvertsFilters advertCount={currentlyShownAdverts.length} updateFilter={updateFilter} updateAdvertSorting={updateAdvertSorting} />
                <AdvertsDisplay shownAdverts={currentlyShownAdverts} />
            </div>
            <RecentlySold />
        </div>
    )
}

export default AllAdverts
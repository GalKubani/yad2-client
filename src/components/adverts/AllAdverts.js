import React, { useContext, useState } from 'react'
import RecentlySold from './RecentlySold'
import AdvertsDisplay from './AdvertsDisplay'
import AdvertsFilters from './AdvertFilters'
import { AdvertContext } from '../../context/AdvertContext'
import Pagination from './Pagination'

const AllAdverts = ({ currentlyShownAdverts, setCurrentlyShownAdverts }) => {
    const { allAdverts } = useContext(AdvertContext)
    const [advertsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastAdvert = currentPage * advertsPerPage
    const indexOfFirstAdvert = indexOfLastAdvert - advertsPerPage
    const advertsOnPage = currentlyShownAdverts.slice(indexOfFirstAdvert, indexOfLastAdvert)

    const updateFilter = (filterOptions) => {
        let filteredAdvertsArray = []
        filteredAdvertsArray = allAdverts.filter((advert) => {
            if (filterOptions[0] && filterOptions[1]) { return (advert.assetPrice * 1 > 0 && advert.assetPictures.length > 0) }
            if (filterOptions[0]) { return advert.assetPrice * 1 > 0 }
            if (filterOptions[1]) { return advert.assetPictures.length > 0 }
            return true
        })
        setCurrentlyShownAdverts([...filteredAdvertsArray])
    }
    const updateAdvertSorting = (sortingOption) => {
        let sortedAdvertArray = [...currentlyShownAdverts]
        if (sortingOption === "date") {
            sortedAdvertArray.sort(function (a, b) {
                if (new Date(a.updatedAt) - new Date(b.updatedAt) > 0) { return -1 }
                else { return 1 }
            })
        }
        else if (sortingOption === "price-down") { sortedAdvertArray.sort(function (a, b) { return a.assetPrice - b.assetPrice }) }
        else { sortedAdvertArray.sort(function (a, b) { return b.assetPrice - a.assetPrice }) }
        setCurrentlyShownAdverts([...sortedAdvertArray])
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <div className="adverts-display-container">
            <div className="adverts-container">
                <AdvertsFilters advertCount={currentlyShownAdverts.length} updateFilter={updateFilter} updateAdvertSorting={updateAdvertSorting} />
                <AdvertsDisplay shownAdverts={advertsOnPage} />
                <Pagination currentPage={currentPage} paginate={paginate} advertsPerPage={advertsPerPage} totalAdverts={currentlyShownAdverts.length} />
            </div>
            <RecentlySold />
        </div>
    )
}

export default AllAdverts
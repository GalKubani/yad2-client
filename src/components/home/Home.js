import React, { useContext, useEffect, useState } from 'react'
import { getAdvertsAction } from '../../actions/advertActions'
import { AdvertContext } from '../../context/AdvertContext'
import { getAllAdverts } from '../../server/db'
import AllAdverts from '../adverts/AllAdverts'
import SearchBar from './SearchBar'

const Home = () => {
    const { allAdverts, advertDispatch } = useContext(AdvertContext)
    const [currentlyShownAdverts, setCurrentlyShownAdverts] = useState([])
    document.getElementsByTagName("title")[0].innerHTML = `נדל"ן למכירה יד2 | אלפי מודעות חדשות בכל יום`
    const onSearchAttempt = (searchData) => {
        let currentAdverts = allAdverts
        const filterRange = (min, max, value) => {
            if (min) { if (value * 1 < min * 1) { return false } }
            if (max) { if (value * 1 > max * 1) { return false } }
            return true
        }
        let filteredAdverts = currentAdverts.filter((advert) => {
            if (searchData.assetTypeSearchOptions.length > 0 || searchData.assetTypeSearchOptions.includes("הכל")) {
                if (!searchData.assetTypeSearchOptions.includes(advert.assetType)) { return false }
            }
            if (!filterRange(searchData.minimumPriceRange, searchData.maximumPriceRange, advert.assetPrice)) { return false }
            if (!filterRange(searchData.minimumRoomRange, searchData.maximumRoomRange, advert.assetTotalRooms)) { return false }
            if (searchData.locationData.includes(",")) {
                let option = searchData.locationData.slice(0, searchData.locationData.indexOf(",")).trim()
                let city = searchData.locationData.slice(searchData.locationData.indexOf(",") + 1).trim()
                if (city !== advert.assetCity && (option !== advert.assetStreet || option !== advert.assetNeighborhood)) {
                    return false
                }
            }
            else {
                if (searchData.locationData) {
                    if (searchData.locationData !== advert.assetCity) { return false }
                }
            }
            if (searchData.assetCharecteristics) {
                if (searchData.assetCharecteristics.length > 0) {
                    for (let option of searchData.assetCharecteristics) {
                        if (!advert.assetCharecteristics.includes(option)) { return false }
                    }
                }
                if (!filterRange(searchData.minimumSizeRange, searchData.maximumSizeRange, advert.assetBuiltSize)) { return false }
                if (!filterRange(searchData.minimumFloorRange, searchData.maximumFloorRange, advert.assetFloorNumber)) { return false }
                if (searchData.dateOfEntry) {
                    let dateChecked = new Date()
                    dateChecked.setMonth(advert.dateOfEntry.slice(3) * 1 - 1)
                    dateChecked.setDate(advert.dateOfEntry.slice(0, 2))
                    if (searchData.dateOfEntry > dateChecked) { return false }
                }
            }
            return true
        })
        setCurrentlyShownAdverts([...filteredAdverts])
    }
    useEffect(() => {
        async function fetchData() {
            await getAllAdverts().then((res) => {
                advertDispatch(getAdvertsAction(res))
                setCurrentlyShownAdverts(res.sort(function (a, b) {
                    if (new Date(a.updatedAt) - new Date(b.updatedAt) > 0) { return -1 }
                    else { return 1 }
                }))
            })
        }
        fetchData()
    }, [advertDispatch])
    return (
        <div className="home">
            <div className="commercial-container">פרסומת</div>
            <SearchBar onSearchAttempt={onSearchAttempt} />
            <div className="commercial-container">פרסומת</div>
            <AllAdverts currentlyShownAdverts={currentlyShownAdverts} setCurrentlyShownAdverts={setCurrentlyShownAdverts} />
        </div>
    )
}

export default Home
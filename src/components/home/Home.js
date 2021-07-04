import React, { useContext, useEffect, useState } from 'react'
import { getAdvertsAction } from '../../actions/advertActions'
import { AdvertContext } from '../../context/AdvertContext'
import { getAllAdverts } from '../../server/db'
import AllAdverts from '../adverts/AllAdverts'
import SearchBar from './SearchBar'

const Home = () => {
    const { advertDispatch } = useContext(AdvertContext)
    const [currentlyShownAdverts, setCurrentlyShownAdverts] = useState([])

    document.getElementsByTagName("title")[0].innerHTML = `נדל"ן למכירה יד2 | אלפי מודעות חדשות בכל יום`

    const onSearchAttempt = (searchData) => {
        // will filter all adverts from info in the search data and then save the currently shown
    }
    useEffect(async () => {
        await getAllAdverts().then((res) => {
            advertDispatch(getAdvertsAction(res))
            setCurrentlyShownAdverts(res)
        })
    }, [])
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
import React from 'react'
import SearchBar from './SearchBar'

const Home = () => {

    document.getElementsByTagName("title")[0].innerHTML = `נדל"ן למכירה יד2 | אלפי מודעות חדשות בכל יום`

    return (
        <div className="home">
            <div className="commercial-container">פרסומת</div>
            <SearchBar />
            <div className="commercial-container">פרסומת</div>
        </div>
    )
}

export default Home
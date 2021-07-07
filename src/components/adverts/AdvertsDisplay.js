import React from 'react'
import AdvertExpand from './AdvertExpand'

const AdvertsDisplay = ({ shownAdverts }) => {
    const onAdvertClick = (e) => {
        e.preventDefault()
        let currentExpenaded = document.getElementsByClassName("advert-expanded")[e.target.parentElement.id * 1]
        currentExpenaded.classList.toggle("shown")
    }
    return (
        <div className="advert-display-wrapper">
            {shownAdverts.map((advert) => {
                return (
                    <div key={advert._id} onClick={onAdvertClick} className="advert-wrapper">
                        <div className="advert-column-right">
                            <div className="advert-image-container">
                                <img src={advert.assetPictures[0] || "https://my.yad2.co.il//newOrder/images/publish/selectImage.png"} alt="ללא תמונה"></img>
                                <div>    <span>{advert.assetPictures.length !== 0 ? (advert.assetPictures.length - 1) + "+" : "ללא"}</span> </div>
                            </div>
                            <div className="advert-location-div">
                                <span>{advert.assetStreet + " " + (advert.assetHouseNumber || 3)}</span>
                                <span className="subtitle-smaller">{advert.assetType + ", " + advert.assetNeighborhood + ", " + advert.assetCity}</span>
                            </div>
                        </div>
                        <div className="advert-column-middle">
                            <div><span>{advert.assetTotalRooms}</span> חדרים</div>
                            <div><span>{advert.assetFloorNumber || 8}</span> קומה</div>
                            <div><span>{advert.assetBuiltSize}</span> מ"ר</div>
                        </div>
                        <div className="advert-column-left">
                            <div>{advert.assetPrice !== 0 ? "₪" : ""}{advert.assetPrice || " לא צוין מחיר"}</div>
                            <div className="updated-at">{new Date(advert.updatedAt).toLocaleDateString("he-IL", { month: "2-digit", day: "2-digit" })
                                === new Date().toLocaleDateString("he-IL", { month: "2-digit", day: "2-digit" }) ? "עודכן היום"
                                : "עודכן ב-" + new Date(advert.updatedAt).toLocaleDateString("he-IL", { month: "2-digit", day: "2-digit" })}
                            </div>
                        </div>
                        <AdvertExpand advert={advert} />
                    </div>
                )
            })}
        </div>
    )
}

export default AdvertsDisplay
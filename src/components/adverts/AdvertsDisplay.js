import React from 'react'
import AdvertExpand from './AdvertExpand'

const AdvertsDisplay = ({ shownAdverts }) => {



    const onAdvertClick = (e) => {
        e.preventDefault()
    }
    return (
        <div className="advert-display-wrapper">
            {shownAdverts.map((advert) => {
                return (
                    <div onClick={onAdvertClick} className="advert-wrapper">
                        <div className="advert-column-right"></div>
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
                        <AdvertExpand />
                    </div>
                )
            })}
        </div>
    )
}

export default AdvertsDisplay
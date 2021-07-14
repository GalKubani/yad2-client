import React, { useState } from 'react'
import AdvertExpand from './AdvertExpand'
import AdvertPicturesModal from './AdvertPicturesModal'

const AdvertsDisplay = ({ shownAdverts }) => {
    const [isPictureModalOpen, setIsPictureModalOpen] = useState([false, false, false, false, false])

    const onAdvertClick = (e) => {
        e.preventDefault()
        let currentExpanded = document.getElementsByClassName("advert-expanded")[e.target.parentElement.id * 1]
        currentExpanded.classList.toggle("shown")
        currentExpanded.parentElement.children[0].classList.toggle("right-expanded")
        currentExpanded.parentElement.children[0].children[0].children[0].classList.toggle("image-expanded")
        currentExpanded.parentElement.children[0].children[1].classList.toggle("unset-width")
        currentExpanded.parentElement.children[1].classList.toggle("abs")
        currentExpanded.parentElement.children[2].children[2].classList.toggle("shown")
    }
    const onPicClick = (e) => {
        e.preventDefault()
        if (e.target.classList.contains("image-expanded") && e.target.src !== "https://my.yad2.co.il//newOrder/images/publish/selectImage.png") {
            e.stopPropagation()
            let currentPicModalArr = [...isPictureModalOpen]
            currentPicModalArr[e.target.parentElement.id * 1] = true
            setIsPictureModalOpen([...currentPicModalArr])
        }
    }
    const closeModal = (element) => {
        let currentPicModalArr = [...isPictureModalOpen]
        currentPicModalArr[element.id * 1] = false
        setIsPictureModalOpen([...currentPicModalArr])
    }
    return (
        <div className="advert-display-wrapper">
            {shownAdverts.map((advert, index) => {
                return (
                    <div id={index} key={advert._id} onClick={onAdvertClick} className="advert-wrapper">
                        <div id={index} className="advert-column-right">
                            <div id={index} className="advert-image-container">
                                <img className="reg-image" onClick={onPicClick} src={advert.assetPictures[0] || "https://my.yad2.co.il//newOrder/images/publish/selectImage.png"} alt="ללא תמונה"></img>
                                {isPictureModalOpen[index] && <AdvertPicturesModal pictures={advert.assetPictures} closeModal={closeModal} />}
                                <div className="count-div" id={index}><span>{advert.assetPictures.length !== 0 ? (advert.assetPictures.length - 1) + "+" : "ללא"}</span> </div>
                            </div>
                            <div id={index} className="advert-location-div">
                                <span>{advert.assetStreet + " " + (advert.assetHouseNumber || 3)}</span>
                                <span className="subtitle-smaller">{advert.assetType + ", " + advert.assetNeighborhood + ", " + advert.assetCity}</span>
                            </div>
                        </div>
                        <div id={index} className="advert-column-middle">
                            <div id={index}><span>{advert.assetTotalRooms}</span> חדרים</div>
                            <div id={index}><span>{advert.assetFloorNumber || 8}</span> קומה</div>
                            <div id={index}><span>{advert.assetBuiltSize}</span> מ"ר</div>
                        </div>
                        <div id={index} className="advert-column-left">
                            <div>{advert.assetPrice !== 0 ? "₪" + (advert.assetPrice.toLocaleString()) : "לא צוין מחיר"}</div>
                            <div className="updated-at">{new Date(advert.updatedAt).toLocaleDateString("he-IL", { month: "2-digit", day: "2-digit" })
                                === new Date().toLocaleDateString("he-IL", { month: "2-digit", day: "2-digit" }) ? "עודכן היום"
                                : "עודכן ב-" + new Date(advert.updatedAt).toLocaleDateString("he-IL", { month: "2-digit", day: "2-digit" })}
                            </div>
                            <button className="show-number-button">
                                הצגת מספר טלפון
                            </button>
                        </div>
                        <AdvertExpand advert={advert} />
                    </div>
                )
            })}
        </div>
    )
}

export default AdvertsDisplay
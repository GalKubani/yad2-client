import React from 'react'

const AdvertExpand = ({ advert }) => {
    return (
        <div className="advert-expanded">
            <div className="advert-expanded-blank"></div>
            <div className="asset-description-container">
                <label>תיאור הנכס</label>
                <p>{advert.assetDetails}</p>
                <div className="info-grid">
                    <div>מצב הנכס <label>{advert.assetCondition}</label></div>
                    <div>תאריך כניסה <label>{new Date(advert.dateOfEntry).setYear(2021) > new Date() ? "כניסה מיידית" : advert.dateOfEntry}</label></div>
                    <div>קומות בבניין <label>{advert.assetBuildingTotalFloors || 8}</label></div>
                    <div>מרפסות <label>{advert.assetTotalPorchs}</label></div>
                    <div>חניות <label>{advert.assetTotalParking}</label></div>
                </div>
                <label>מה יש בנכס?</label>
                <div className="content-column-wrapper">
                    {["מיזוג", "דוד שמש", "ריהוט", "מעלית", "ממד", "משופצת"].map((value) => {
                        return (
                            <div className={"charecteristics-div " + (advert.assetCharecteristics.includes(value) ? " " : "unchecked")} key={value}>{value}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdvertExpand
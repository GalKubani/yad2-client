import React from 'react'

const AdvertExpand = ({ advert }) => {

    return (
        <div className="advert-expanded">
            <div className="advert-expanded-blank"></div>
            <div className="asset-description-container">
                <label>תיאור הנכס</label>
                <p>{advert.assetDetails}</p>
            </div>
            <div className="asset-description-container"></div>
        </div>
    )
}

export default AdvertExpand
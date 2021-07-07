import React, { useState } from 'react'

const AssetDropdown = ({ onReturnData }) => {

    const [assetData, setAssetData] = useState([false, false, false, false])
    const onCheckboxClick = (e) => {
        e.preventDefault()
        const sharedParentElement = e.target.parentElement;
        sharedParentElement.children[0].checked = !sharedParentElement.children[0].checked
        sharedParentElement.children[1].classList.toggle("checkmark-checked")
        let currentAssetData = assetData
        switch (sharedParentElement.children[0].value) {
            case "דירות": currentAssetData[1] = !currentAssetData[1]; break;
            case "בתים": currentAssetData[2] = !currentAssetData[2]; break;
            case "גג/פנטהאוז": currentAssetData[3] = !currentAssetData[3]; break;
            default: currentAssetData[0] = !currentAssetData[0]
                currentAssetData[1] = currentAssetData[0]
                currentAssetData[2] = currentAssetData[0]
                currentAssetData[3] = currentAssetData[0]
                    ; break;
        }
        setAssetData(currentAssetData)
    }
    const onConfirm = (e) => {
        e.preventDefault()
        onReturnData(assetData)
    }
    return (
        <div className="dropdown_content dropdown-assets">
            <ul>
                <li className="asset-checkbox">
                    <div className="checkbox-background">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox" value="כל סוגי הנכסים" />
                            <span onClick={onCheckboxClick} className="checkmark"></span>
                            <span onClick={onCheckboxClick} className="cb_text"> כל סוגי הנכסים </span>
                        </label>
                    </div>
                </li>
                <li className="asset-checkbox">
                    <div className="checkbox-background">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox" value="דירות" />
                            <span onClick={onCheckboxClick} className="checkmark"></span>
                            <span onClick={onCheckboxClick} className="cb_text"> דירות </span>
                        </label>
                    </div>
                </li>
                <li className="asset-checkbox">
                    <div className="checkbox-background">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox" value="בתים" />
                            <span onClick={onCheckboxClick} className="checkmark"></span>
                            <span onClick={onCheckboxClick} className="cb_text"> בתים </span>
                        </label>
                    </div>
                </li>
                <li className="asset-checkbox">
                    <div className="checkbox-background">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox" value="גג/פנטהאוז" />
                            <span onClick={onCheckboxClick} className="checkmark"></span>
                            <span onClick={onCheckboxClick} className="cb_text">גג/פנטהאוז  </span>
                        </label>
                    </div>
                </li>
            </ul>
            <div className="dropdown-footer">
                <button onClick={onConfirm} type="button">
                    <span className="button-content">בחירה</span>
                </button>
            </div>
        </div>
    )
}

export default AssetDropdown
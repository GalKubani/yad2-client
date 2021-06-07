import React from 'react'

const AssetDropdown = () => {



    return (
        <div className="dropdown_content dropdown-assets">
            <ul>
                <li className="asset-checkbox">
                    <div className="checkbox-background">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox" value="false" />
                            <span className="checkmark"></span>
                            <span className="cb_text"> כל סוגי הנכסים </span>
                        </label>
                    </div>
                </li>
                <li className="asset-checkbox">
                    <div className="checkbox-background">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox" value="false" />
                            <span className="checkmark"></span>
                            <span className="cb_text"> דירות </span>
                        </label>
                    </div>
                </li>
                <li className="asset-checkbox">
                    <div className="checkbox-background">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox" value="false" />
                            <span className="checkmark"></span>
                            <span className="cb_text"> בתים </span>
                        </label>
                    </div>
                </li>
                <li className="asset-checkbox">
                    <div className="checkbox-background">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox" value="false" />
                            <span className="checkmark"></span>
                            <span className="cb_text"> סוגים נוספים </span>
                        </label>
                    </div>
                </li>
            </ul>
            <div className="dropdown-footer">
                <button type="button">
                    <span className="button-content">בחירה</span>
                </button>
            </div>
        </div>
    )
}

export default AssetDropdown
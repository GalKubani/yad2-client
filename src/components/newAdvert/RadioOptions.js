import React from 'react'

const RadioOptions = ({ radioName, onCheckBox }) => {

    return (
        <div>
            {[0, 1, 2, 3].map((value) => {
                return (<span key={value}>
                    <input onClick={onCheckBox} name={radioName} type="radio" className="radio_input" value={value} defaultChecked={value === 0} />
                    <div className={"radio-content-wrapper" + (value === 0 ? " radio-one radio-active" : value === 3 ? " radio-four" : "")}>
                        <span className="radio-content">{value === 0 ? "ללא" : value}</span>
                    </div>
                </span>)
            })}
        </div>
    )
}

export default RadioOptions
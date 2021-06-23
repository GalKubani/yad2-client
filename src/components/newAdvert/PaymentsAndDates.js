import React from 'react'

const PaymentAndDates = ({ onClickForward, currentClassName, onClickBack }) => {



    const onFinishArea = (e) => {
        e.preventDefault()
        // will nn to validate all * fields are filled
        // will then nn to send data up, close this box and open the next
        onClickForward()
    }
    return (
        <div className={currentClassName}>
            <span className="number-icon">3</span>
            <h2>תשלומים, תאריכים ועוד</h2>
            <form onSubmit={onFinishArea}>


                <div className="buttonsNextPreviousWrap">
                    <button onClick={onClickBack} className="btnBack">חזרה</button>
                    <button type="submit" className="btnNext no-focus-outline">להמשיך לשלב הבא</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentAndDates
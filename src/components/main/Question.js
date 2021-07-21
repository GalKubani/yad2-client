import React from 'react'

const Question = () => {
    const onClickX = (e) => {
        e.target.parentElement.parentElement.style.display = "none"
    }
    return (
        <div className="question">
            <div className="question-title">יש לך שאלה? <span onClick={onClickX} className="x-button"></span></div>
            <input className="question-input" type="search" placeholder="הקלד את שאלתך כאן" />
        </div>
    )
}

export default Question
import React from 'react'

const PriceModal = ({ closeModal }) => {

    const onModalClick = (e) => {
        if (e.target.className === "modal-container modal-active") {
            closeModal()
        }
    }
    return (
        <div onClick={onModalClick} className="modal-container modal-active">
            <section className="modal-content viewable"><strong className="modal-title">המחיר שהוזן נמוך מהצפוי לדירה למכירה</strong>
                <span className="modal-text">
                    האם לבצע חיפוש עבור דירות להשכרה או לחזור לחיפוש לשינוי מחיר?
            </span>
                <button className="modal-button oj" onClick={closeModal} type="button">
                    חיפוש נכסים להשכרה
            <span><span></span></span>
                </button>
                <button className="modal-button return" onClick={closeModal} type="button">
                    חזרה לחיפוש
            <span><span></span></span>
                </button>
            </section>
        </div>
    )
}

export default PriceModal
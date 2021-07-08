import React from 'react'

const AdvertPicturesModal = ({ closeModal }) => {


    const onModalClick = (e) => {
        if (e.target.className === "modal-container modal-active") {
            closeModal()
        }
    }
    return (
        <div onClick={onModalClick} className="modal-container modal-active">
            <section className="modal-content viewable"><strong className="modal-title">המחיר שהוזן נמוך מהצפוי לדירה למכירה</strong>

            </section>
        </div>
    )
}

export default AdvertPicturesModal
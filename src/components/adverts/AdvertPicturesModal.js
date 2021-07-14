import React, { useState } from 'react'

const AdvertPicturesModal = ({ pictures, closeModal }) => {
    const [pictureIndex, setPictureIndex] = useState(0)

    const onModalClick = (e) => {
        e.stopPropagation()
        closeModal(e.target.parentElement)
    }
    const onPictureClick = (e) => {
        e.stopPropagation()
        if (pictures.length - 1 === pictureIndex) { setPictureIndex(0) }
        else { setPictureIndex(pictureIndex + 1) }
    }
    return (
        <span onClick={onModalClick} className="modal-container modal-pictures">
            <section className="modal-content visible">
                <div className="images-display-popup">
                    <img onClick={onPictureClick} src={pictures[pictureIndex]} className="expanded-image"></img>
                    <span>{"תמונה " + (pictureIndex + 1) + " מתוך " + (pictures.length)}</span>
                </div>
            </section>
        </span>
    )
}

export default AdvertPicturesModal
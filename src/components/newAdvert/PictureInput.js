import React from 'react'

const PictureInput = ({ className, assetPicturesFile, dispatchUpdate, assetPictureData, value }) => {

    const onAddingPicture = (e) => {
        let picIndex = e.target.name * 1
        const picture = e.target.files[0]
        if (!picture) { return }
        let newPicSrcArr = [...assetPicturesFile]
        newPicSrcArr[picIndex] = URL.createObjectURL(picture)
        dispatchUpdate(newPicSrcArr, "pictures")
        let updatedPicArray = assetPictureData
        updatedPicArray[picIndex] = picture
        dispatchUpdate(updatedPicArray, "ada")
    }
    const onPlusClick = (e) => {
        let currentInput
        if (e.target.className === "media-plus-wrap") { currentInput = e.target.previousElementSibling }
        else { currentInput = e.target.parentElement.previousElementSibling }
        currentInput.click()
    }
    const onMouseLeavePic = (e) => { e.target.classList.remove("overpic") }
    const onMouseOverPic = (e) => { e.target.classList.add("overpic") }
    const onMouseClickPic = (e) => { e.target.parentElement.previousElementSibling.children[0].click() }
    const onTrashClick = (e) => {
        e.preventDefault();
        let picIndex = e.target.name
        let updatedPictures = [...assetPicturesFile]
        updatedPictures[picIndex] = undefined
        dispatchUpdate(updatedPictures, "pictures")
        let updatedPicArray = [...assetPictureData]
        updatedPicArray[picIndex] = undefined
        dispatchUpdate(updatedPicArray, "ada")
    }

    return (
        <div key={value} className={className}>
            <div className="media-input-wrapper">
                <input accept="image/*" name={value} className="media-input" type="file" onChange={onAddingPicture}></input>
                <div onClick={onPlusClick} className="media-plus-wrap">  +   <p>העלאת תמונות</p></div>
            </div>
            <div className={"reg-pic-wrapper" + (assetPicturesFile[value] ? " shown" : " hidden")}>
                {assetPicturesFile[value] && <button name={value} onClick={onTrashClick} className="remove-pic-button">🗑</button>}
                <img alt="" onMouseOver={onMouseOverPic} onMouseLeave={onMouseLeavePic} onClick={onMouseClickPic} name={value} src={assetPicturesFile[value]}></img>
            </div>
        </div>
    )
}

export default PictureInput
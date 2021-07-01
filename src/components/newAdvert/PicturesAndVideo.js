import React, { useState } from 'react'
import PictureInput from './PictureInput'

const PicturesAndVideo = ({ onClickForward, currentClassName, onClickBack }) => {
    const [assetPicturesFile, setAssetPicturesFile] = useState([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined])
    const [assetPictureData, setAssetPictureData] = useState([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined])
    const [assetVideo, setAssetVideo] = useState(undefined)

    const onFinishArea = (e) => {
        e.preventDefault()
        let mediaData = {
            assetPictures: assetPictureData,
            assetVideo
        }
        onClickForward(mediaData)
    }
    const onAddingPicture = (e) => {
        let picIndex = e.target.name
        const picture = e.target.files[0]
        if (!picture) { return }
        let newPicSrcArr = [...assetPicturesFile]
        newPicSrcArr[picIndex] = URL.createObjectURL(picture)
        setAssetPicturesFile(newPicSrcArr)
        let updatedPicArray = [...assetPictureData]
        updatedPicArray[picIndex] = picture
        setAssetPictureData([...updatedPicArray])
    }
    const onAddingVideo = (e) => {
        const video = e.target.files[0]
        if (!video) { return }
        setAssetVideo(video)
    }
    const onPlusClick = (e) => {
        let currentInput
        if (e.target.className === "media-plus-wrap") { currentInput = e.target.previousElementSibling }
        else { currentInput = e.target.parentElement.previousElementSibling }
        currentInput.click()
    }
    const onMouseClickPic = (e) => { e.target.parentElement.previousElementSibling.children[0].click() }
    const onTrashClick = (e) => {
        e.preventDefault();
        let picIndex = e.target.name
        let updatedPictures = [...assetPicturesFile]
        updatedPictures[picIndex] = undefined
        setAssetPicturesFile(updatedPictures)
        let updatedPicArray = [...assetPictureData]
        updatedPicArray[picIndex] = undefined
        setAssetPictureData([...updatedPicArray])
    }
    const dispatchUpdate = (data, option) => {
        if (option === "pictures") { setAssetPicturesFile(data) }
        else { setAssetPictureData([...data]) }
    }
    const onTrashVideoClick = (e) => {
        e.preventDefault()
        setAssetVideo(undefined)
    }
    const onMouseLeavePic = (e) => { e.target.classList.remove("overpic") }
    const onMouseOverPic = (e) => { e.target.classList.add("overpic") }
    return (
        <div className={currentClassName}>
            <span className="number-icon">4</span> <h2>תמונות וסרטונים</h2>
            <form onSubmit={onFinishArea}>
                <h4>
                    <div>ידעת שמודעות עם תמונות ברורות מקבלות פי 10 יותר פניות? </div>
                    <div>לא להסס להעלות לפה תמונות (אפשר עד 10 + וידאו) ולהבליט את הצדדים הטובים ביותר של הנכס</div>
                </h4>
                <div className="main-media-container">
                    <div className="media-input-wrapper">
                        <input className="media-input" type="file" onChange={onAddingVideo}></input>
                        {/* {assetVideo && <button onClick={onTrashVideoClick} className="remove-pic-button">🗑</button>} */}
                        <div onClick={onPlusClick} className="media-plus-wrap"><img alt="video" src="https://yad2upload.cdnwiz.com/newupload/icons/video.jpg"></img>   <p>העלאת סרטון</p></div>
                    </div>
                    <div className="media-input-wrapper">
                        <div className="main-pic-media">
                            <div>תמונה ראשית</div>
                            <div className="main-input-wrapper">
                                <input name={0} accept="image/*" className="media-input" type="file" onChange={onAddingPicture}></input>
                                <div onClick={onPlusClick} className="media-plus-wrap">  +   <p>העלאת תמונות</p></div>
                            </div>
                            <div className={"main-pic-wrapper" + (assetPicturesFile[0] ? " shown" : " hidden")}>
                                {assetPicturesFile[0] && <button name={0} onClick={onTrashClick} className="remove-pic-button">🗑</button>}
                                <img alt="" onMouseOver={onMouseOverPic} onMouseLeave={onMouseLeavePic} onClick={onMouseClickPic} name={0} src={assetPicturesFile[0]}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <h4>תמונות שיופיעו בגוף המודעה</h4>
                <div className="main-media-container">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
                        return (
                            <PictureInput className={"media-data-container"} value={value} key={value} assetPicturesFile={assetPicturesFile} dispatchUpdate={dispatchUpdate}
                                assetPictureData={assetPictureData} />
                        )
                    })}
                </div>
                <div className="buttonsNextPreviousWrap">
                    <button onClick={onClickBack} className="btnBack">חזרה</button>
                    <button type="submit" className="btnNext no-focus-outline">להמשיך לשלב הבא</button>
                </div>
            </form>
        </div>
    )
}

export default PicturesAndVideo
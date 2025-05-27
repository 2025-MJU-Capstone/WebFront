import {useNavigate} from 'react-router-dom'
import './Body.css'
import {useEffect, useRef, useState} from "react"
import sBody from "../assets/select_Body.svg";

function Body() {
    const navigate = useNavigate();
    const [upImage, setUpImage] = useState(null)
    const [downImage, setDownImage] = useState(null)
    const [rightImage, setRightImage] = useState(null)
    const [leftImage, setLeftImage] = useState(null)
    const [isValid, setIsValid] = useState(false)
    const dropRef = useRef()

    const [test, setTest] = useState(true)

    useEffect(() => {
        if ((upImage !== null) && (downImage !== null) && (rightImage !== null) && (leftImage !== null))
            setIsValid(true)
        else
            setIsValid(false)
    }, [upImage, downImage, rightImage, leftImage])

    const handleDrop = (e, setImage) => {
        if (window.location.pathname.split('/').pop() !== 'body') return
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file)
            setImage(url)
        }
    }

    const handleDragOver = (e) => {
        if (window.location.pathname.split('/').pop() !== 'body') return
        e.preventDefault()
    }

    if (test == false) {
        return (
            <div>
                <h1 style={{marginLeft: "30px"}}>본인의 사진을 등록해보세요</h1>
                <h3 style={{marginLeft: "30px"}}>드래그하여 사진을 등록하세요</h3>

                <div className="body-container">
                    <div className={"body-flex"}>
                        <div className={"image"}
                             onClick={() => setUpImage(null)}
                             ref={dropRef}
                             onDrop={(e) => handleDrop(e, setUpImage)}
                             onDragOver={handleDragOver}
                        >
                            {upImage ? (
                                <img
                                    src={upImage}
                                    alt="업로드된 이미지"
                                    style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}}
                                />
                            ) : (
                                <p className={"image-font"}>앞모습</p>
                            )}
                        </div>
                        <div className={"image"}
                             onClick={() => setDownImage(null)}
                             ref={dropRef}
                             onDrop={(e) => handleDrop(e, setDownImage)}
                             onDragOver={handleDragOver}
                        >
                            {downImage ? (
                                <img
                                    src={downImage}
                                    alt="업로드된 이미지"
                                    style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}}
                                />
                            ) : (
                                <p className={"image-font"}>뒷모습</p>
                            )}
                        </div>
                        <div
                            className={"image"}
                            onClick={() => setRightImage(null)}
                            ref={dropRef}
                            onDrop={(e) => handleDrop(e, setRightImage)}
                            onDragOver={handleDragOver}
                        >
                            {rightImage ? (
                                <img
                                    src={rightImage}
                                    alt="업로드된 이미지"
                                    style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}}
                                />
                            ) : (
                                <p className={"image-font"}>옆모습</p>
                            )}
                        </div>
                        <div
                            className={"image"}
                            onClick={() => setLeftImage(null)}
                            ref={dropRef}
                            onDrop={(e) => handleDrop(e, setLeftImage)}
                            onDragOver={handleDragOver}
                        >
                            {leftImage ? (
                                <img
                                    src={leftImage}
                                    alt="업로드된 이미지"
                                    style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}}
                                />
                            ) : (
                                <p className={"image-font"}>옆모습</p>
                            )}
                        </div>
                    </div>
                    <p style={{marginLeft: "30px"}}>전신이 다 나오는 사진을 넣어주세요.</p>
                    <div className={"bottom-container"}>
                        <p>체형을 분석하는 데 시간이 걸릴 수 있어요.</p>
                        <p style={{marginLeft: "28%"}}>사진이 없다면 실시간으로 촬영 후 분석이 가능해요.</p>
                    </div>
                    <button className={isValid ? "btn-active" : "btn-inactive"} disables={isValid}>실시간 분석하기</button>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className={"body-flex2"}>
                    <img
                        className={"image2"}
                        src="none"
                    />
                    <div>
                        <h2 style={{marginTop: "0px"}}>나의 체형에는 이런 것들이 어울려요!</h2>
                        <p>예시예시</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default Body
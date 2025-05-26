import {useNavigate} from 'react-router-dom'
import './SignUp.css'
import {useEffect, useRef, useState} from "react"

function SignUp() {
    const [agree, setAgree] = useState(false)

    const handleCheckChange = (e) =>{
        setAgree(e.target.checked);
    }

    return (
        <div className="signUp-container">
            <h2 className="h-text">서비스 이용 약관</h2>
            <div className="scroll-box">
                <p>
                추후 추가 예정
                </p>
            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={agree}
                    onChange={handleCheckChange}
                    className="checkbox-check"
                    />
                <span className="checkbox-span">동의합니다.</span>
            </div>
        </div>
    )
}

export default SignUp
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import mainLogo from "../../assets/MainLogo.svg";

function MainSidebar({
                         width,
                         id, setId,
                         password, setPassword,
                         passwordHide, setPasswordHide,
                         setMode
                     }) {
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordHide(prev => !prev);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                accountId: id,
                password: password,
            });

            const {accessToken, refreshToken} = response.data.data;

            // 토큰 로컬스토리지 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            alert('로그인 성공!');
            setMode('body'); // 로그인 성공 후 모드 변경
            navigate('/body'); // 홈으로 이동

        } catch (error) {
            console.error(error);
            alert('로그인 실패: ' + (error.response?.data?.message || '서버 오류'));
        }
    };

    const inputStyle = {
        width: '100%',
        height: '3rem',
        padding: '0.4rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    };

    if (localStorage.getItem('accessToken') == null) {
        return (
            <div style={{
                width,
                background: '#ffffff',
                color: 'black',
                padding: '1rem',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: 'inset 6px 0px 0px rgba(0, 0, 0, 0.1)',
                marginTop: '-4rem'
            }}>
                <div style={{
                    width: '70%',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginTop: '5rem'
                }}>
                    <h1 style={{color: 'black', textAlign: 'center'}}>로그인</h1>

                    {/* 아이디 입력 */}
                    <div>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            style={inputStyle}
                            placeholder="아이디를 입력하세요."
                        />
                    </div>

                    {/* 비밀번호 입력 */}
                    <div style={{position: 'relative'}}>
                        <input
                            type={passwordHide ? 'password' : 'text'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                            placeholder="비밀번호를 입력하세요."
                        />
                        {passwordHide ? (
                            <AiFillEyeInvisible
                                onClick={togglePasswordVisibility}
                                onMouseDown={(e) => e.preventDefault()}
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    height: '24px',
                                    fontSize: '14px',
                                    padding: '2px 8px',
                                    cursor: 'pointer'
                                }}
                            />
                        ) : (
                            <AiFillEye
                                onClick={togglePasswordVisibility}
                                onMouseDown={(e) => e.preventDefault()}
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    height: '24px',
                                    fontSize: '14px',
                                    padding: '2px 8px',
                                    cursor: 'pointer'
                                }}
                            />
                        )}
                    </div>

                    {/* 로그인 버튼 */}
                    <div>
                        <button
                            onClick={handleLogin}
                            style={{
                                fontSize: '14px',
                                width: '100%',
                                height: '3rem',
                                color: 'white',
                                background: 'black'
                            }}
                        >
                            로그인
                        </button>
                    </div>

                    {/* 카카오 로그인 (아직 비활성화) */}
                    <div>
                        <button
                            style={{
                                fontSize: '14px',
                                width: '100%',
                                height: '3rem',
                                color: 'white',
                                background: 'black'
                            }}
                        >
                            카카오 로그인
                        </button>
                    </div>

                    {/* 회원가입 버튼 */}
                    <div>
                        <button
                            onClick={() => {
                                setMode('signUp');
                                navigate('/signUp');
                            }}
                            style={{
                                fontSize: '14px',
                                width: '100%',
                                height: '3rem',
                                color: 'white',
                                background: 'black'
                            }}
                        >
                            서비스가 처음이신가요? 회원가입 하기
                        </button>
                    </div>

                    {/* 아이디/비밀번호 찾기 */}
                    <div>
                        <label style={{
                            marginLeft: '5.5rem',
                            background: 'none',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}>
                            아이디 찾기
                        </label>
                        <label style={{
                            marginLeft: '1rem',
                            background: 'none',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}>
                            비밀번호 찾기
                        </label>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{
                width,
                background: '#ffffff',
                color: 'black',
                padding: '1rem',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: 'inset 6px 0px 0px rgba(0, 0, 0, 0.1)',
                marginTop: '-4rem'
            }}>
                <div style={{
                    width: '70%',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginTop: '5rem'
                }}>
                    <div style={{ width:"400px",  marginTop:"100px"}}>
                        <img
                            src={mainLogo}
                            width="60%"
                        />
                    </div>
                    <h2 style={{fontSize:"40px", marginLeft:"30px"}}>환영합니다</h2>
                    <br/>
                    <h2 style={{fontSize:"40px", marginLeft:"30px"}}>로그인상태</h2>
                </div>
            </div>
        )
    }
}

export default MainSidebar;


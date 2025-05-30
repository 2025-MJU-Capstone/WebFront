import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';

function SignUpSidebar({
  width,
  signUpId, setSignUpId,
  signUpPassword, setSignUpPassword,
  signUpPasswordHide, setSignUpPasswordHide,
  signUpEmail, setSignUpEmail,
  idError, setIdError,
  passwordError, setPasswordError,
  setMode
}) {
  const navigate = useNavigate();

  const inputStyle = {
    width: '100%',
    height: '3rem',
    padding: '0.4rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const idHandleChange = (e) => {
    const id = e.target.value;
    setSignUpId(id);
    validateId(id);
  };

  const validateId = (id) => {
    let error = [];
    if (id.length < 8) {
      error.push('8자리 이상 입력해야 합니다.');
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(id)) {
      error.push('특수문자는 사용 불가합니다.');
    }
    if (error.length > 0) {
      setIdError(error.join(' '));
    } else {
      setIdError('');
    }
  };

  const passwordHandleChange = (e) => {
    const pw = e.target.value;
    setSignUpPassword(pw);
    validatePassword(pw);
  };

  const validatePassword = (pw) => {
    let error = [];
    if (pw.length < 8) {
      error.push('8자리 이상 입력해야 합니다.');
    }
    if (error.length > 0) {
      setPasswordError(error.join(' '));
    } else {
      setPasswordError('');
    }
  };

  const togglePasswordVisibility = () => {
    setSignUpPasswordHide(prev => !prev);
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/save', {
        accountId: signUpId,
        password: signUpPassword,
        email: signUpEmail,
      });

      alert(response.data.message); // ApiResult<String> 반환됨
      navigate('/');    // 메인(로그인화면)으로 이동
      setMode('main');  // 사이드바 로그인 모드로 변경
    } catch (error) {
      console.error(error);
      alert('회원가입 실패: ' + (error.response?.data?.data || '서버 오류'));
    }
  };

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
      boxShadow: 'inset 6px 0px 0px rgba(0, 0, 0, 0.1)'
    }}>
      <h1>회원가입</h1>

      <div style={{
        width: '70%',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        marginTop: '5rem'
      }}>
        <div>
          <p style={{ margin: 0 }}>사용하실 아이디를 입력하세요.</p>
          <input
            type="text"
            value={signUpId}
            onChange={idHandleChange}
            style={{ ...inputStyle, borderColor: idError ? 'red' : '#ccc' }}
            placeholder="아이디를 입력하세요."
          />
          <p style={{ fontSize: 12, fontWeight: 200, margin: 0 }}>
            영문과 숫자를 사용하여 8자리 이상 입력해주세요.
          </p>
          <p style={{ fontSize: 12, fontWeight: 200, margin: 0 }}>
            특수문자는 사용이 불가합니다.
          </p>
          <p style={{ fontSize: 12, color: 'red' }}>{idError}</p>
        </div>

        <div>
          <p style={{ margin: 0 }}>사용하실 비밀번호를 입력해주세요.</p>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={signUpPasswordHide ? 'password' : 'text'}
              value={signUpPassword}
              onChange={passwordHandleChange}
              style={{ ...inputStyle, borderColor: passwordError ? 'red' : '#ccc' }}
              placeholder="비밀번호를 입력하세요."
            />
            {signUpPasswordHide ? (
              <AiFillEyeInvisible
                onClick={togglePasswordVisibility}
                onMouseDown={(e) => e.preventDefault()}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '40%',
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
                  top: '40%',
                  transform: 'translateY(-50%)',
                  height: '24px',
                  fontSize: '14px',
                  padding: '2px 8px',
                  cursor: 'pointer'
                }}
              />
            )}
          </div>
          <p style={{ fontSize: 12, color: 'red' }}>{passwordError}</p>
        </div>

        <div>
          <p style={{ margin: 0 }}>이메일을 입력하세요.</p>
          <input
            type="text"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <button
            style={{
              width: '100%',
              height: '3rem',
              marginTop: '2rem',
              color: 'white',
              background: 'black'
            }}
            onClick={handleSignUp}
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpSidebar;


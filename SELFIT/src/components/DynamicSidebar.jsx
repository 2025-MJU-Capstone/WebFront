import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DynamicSidebar({ mode, setUrl, inputValue, setInputValue }) {
  const navigate = useNavigate()
  const [gender, setGender] = useState('') // 성별 상태
  const width = '400px'

  const inputStyle = {
    width: '100%',
    height: '3rem',
    padding: '0.4rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  }

  const handleSiteClick = (siteUrl) => {
    setUrl(siteUrl)
    navigate('/store')
  }

  // if (mode === 'iframe') {
  //   return (
  //     <div style={{
  //       width,
  //       background: '#ffffff',
  //       color: 'white',
  //       padding: '1rem',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       gap: '1rem',
  //       boxSizing: 'border-box',
  //       boxShadow: 'inset 6px 0px 0px rgba(0, 0, 0, 0.1)'
  //     }}>
  //       <h2>사이트 목록</h2>
  //       <button onClick={() => handleSiteClick('https://www.musinsa.com/main/musinsa/recommend?gf=A')}>
  //         무신사
  //       </button>
  //       <button onClick={() => handleSiteClick('https://www.29cm.co.kr/')}>
  //         29CM
  //       </button>
  //       <button onClick={() => handleSiteClick('https://zigzag.kr/')}>
  //         지그재그
  //       </button>
  //       <button onClick={() => handleSiteClick('https://display.wconcept.co.kr/rn/women')}>
  //         W CONCEPT
  //       </button>
  //     </div>
  //   )
  // }

  if (mode === 'input') {
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
        <div style={{ width: '70%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '5rem' }}>
          <div>
            <p style={{ margin: 0 }}>이름을 입력하세요</p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={inputStyle}
              placeholder=' ex) 김OO'
            />
          </div>

          <div>
            <p style={{ margin: 0 }}>나이를 입력하세요</p>
            <div style={{ position: 'relative', width: '100%' }}>
              <input type="number" style={inputStyle} />
              <span style={{
                position: 'absolute',
                right: '0.7rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'black',
                pointerEvents: 'none'
              }}>세</span>
            </div>
          </div>

          <div>
            <p style={{ margin: 0 }}>성별을 선택하세요</p>
            <div style={{ display: 'flex', gap: '1.5rem', width: '100%', height: '3rem' }}>
              <button
                onClick={() => setGender('male')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: gender === 'male' ? '#737373' : '#F6F6F6',
                  color: gender === 'male' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                남자
              </button>
              <button
                onClick={() => setGender('female')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: gender === 'female' ? '#737373' : '#F6F6F6',
                  color: gender === 'female' ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                여자
              </button>
            </div>
          </div>

          <div>
            <p style={{ margin: 0 }}>사용하실 닉네임을 입력하세요</p>
            <input type="text" style={inputStyle} />
          </div>

          <div>
            <button
              style={{ width: '100%', height: '3rem', marginTop: '2rem', color: 'white', background: 'black' }}>
              등록하기
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      width,
      background: '#ffffff',
      color: 'black',
      padding: '1rem',
      boxSizing: 'border-box',
      boxShadow: 'inset 6px 0px 0px rgba(0, 0, 0, 0.1)'
    }}>
      <h2>기타 모드</h2>
      <p>{mode} 모드 내용은 나중에 추가</p>
    </div>
  )
}

export default DynamicSidebar

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillEyeInvisible } from "react-icons/ai"
import { AiFillEye } from "react-icons/ai"
import Setting from '../pages/Setting.jsx'
function DynamicSidebar({ mode, setMode, setUrl, inputValue, setInputValue, settingTab, setSettingTab }) {
  const navigate = useNavigate()
  const [gender, setGender] = useState('') // 성별 상태
  const [clothes, setClothes] = useState('') // 상의 하의
  const [image, setImage] = useState(null)
  const [savedImages, setSavedImages] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const dropRef = useRef()
  const width = '400px'
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordHide, setPasswordHide] = useState(true) //비밀번호 숨김 상태
  const [signUpId, setSignUpId] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpPasswordHide, setSignUpPasswordHide] = useState(true)
  const [passwordError, setPasswordError] = useState('')
  const [idError, setIdError] = useState('')
  const [myClosetImages, setMyClosetImages] = useState([]) //개인 옷
  const [selectedMyClosetIndex, setSelectedMyClosetIndex] = useState(null)
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [waist, setWaist] = useState('')
    const [leg, setLeg] = useState('')
    const [shoulder, setShoulder] = useState('')
    const [pelvis, setPelvis] = useState('')
    const [chest, setChest] = useState('')

  const inputStyle = {
    width: '100%',
    height: '3rem',
    padding: '0.4rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  }

  useEffect(() => {
    if (mode !== 'iframe') return

    const handlePaste = (e) => {
      const items = e.clipboardData.items
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile()
          const url = URL.createObjectURL(blob)
          setImage(url)
        }
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [mode])

  const handleSiteClick = (siteUrl) => {
    setUrl(siteUrl)
    navigate('/store')
  }

  const handleDrop = (e) => {
    if (mode !== 'iframe') return
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setImage(url)
    }
  }

  const handleDragOver = (e) => {
    if (mode !== 'iframe') return
    e.preventDefault()
  }

  const handleSaveImage = () => {
    if (image && savedImages.length < 15) {
      setSavedImages(prev => [...prev, image])
      setImage(null)
    }
  }

  const handleMyClosetImageUpload = (e) => { //개인옷 업로드
  const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setMyClosetImages(prev => [...prev, url])
    }
  }
  
  const handleMyClosetImageClick = (index) => {
  setSelectedMyClosetIndex(prev => prev === index ? null : index)
  } 

  const handleDeleteMyClosetImage = () => {
    if (selectedMyClosetIndex !== null) {
      setMyClosetImages(prev => prev.filter((_, i) => i !== selectedMyClosetIndex))
      setSelectedMyClosetIndex(null)
    }
  }



  const handleImageClick = (index) => {
    setSelectedIndex(prev => prev === index ? null : index)
  }

  const handleDeleteSelected = () => {
    if (selectedIndex !== null) {
      setSavedImages(prev => prev.filter((_, i) => i !== selectedIndex))
      setSelectedIndex(null)
    }
  }

  const togglePasswordVisibility = () => {
      setPasswordHide(prev => !prev)
  }
  const signUpTogglePasswordVisibility = () => {
      setSignUpPasswordHide(prev => !prev)
  }

  const passwordHandleChange = (e) => {
      setSignUpPassword(e.target.value)
      validatePassword(e.target.value)
  }

  const validatePassword = (pw) => {
      let error = [];
      if(pw.length < 8){
          error.push('8자리 이상 입력해야 합니다.')
      }

      if(error.length > 0){
          setPasswordError(error.join('<br />'))
      }
      else{
          setPasswordError('')
      }
  }
  const idHandleChange = (e) => {
      setSignUpId(e.target.value)
      validateId(e.target.value)
  }

  const validateId = (id) => {
      let error = [];
      if(id.length < 8){
          error.push('8자리 이상 입력해야 합니다.')
      }

      if (/[!@#$%^&*(),.?":{}|<>]/.test(id)) {
          error.push('특수문자는 사용 불가합니다.');
      }

      if(error.length > 0){
          setIdError(error.join())
      }

      else{
          setIdError('')
      }
  }

  if (mode === 'iframe') {
    return (
      <div style={{
        width,
        background: '#ffffff',
        color: 'black',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxSizing: 'border-box',
        boxShadow: 'inset 6px 0px 0px rgba(0, 0, 0, 0.1)',
        height: '100vh', 
        overflowY: 'auto' 
      }}>
        <h2 style={{marginLeft: '1rem', marginBottom:'0px'}}>옷 검색</h2>
        <p style={{marginLeft: '1rem', marginTop:'0px'}}>의류 사이트에서 원하는 옷을 담아보세요</p>
        <div style={{ display: 'flex', gap: '1.5rem', width: '100%', height: '3rem' }}>
          <button
            onClick={() => setClothes('상의')}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: clothes === '상의' ? 'black' : 'white',
              color: clothes === '상의' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            상의
          </button>
          <button
            onClick={() => setClothes('하의')}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: clothes === '하의' ? 'black' : 'white',
              color: clothes === '하의' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            하의
          </button>
        </div>
        <div
          onClick={() => setImage(null)}
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            height: '200px',
            border: '2px dashed #aaa',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            marginTop: '1rem',
            textAlign: 'center',
            padding: '1rem'
          }}
        >
          {image ? (
            <img
              src={image}
              alt="업로드된 이미지"
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          ) : (
            <p>이미지를 드래그하거나<br />Ctrl+V로 붙여넣기 해주세요</p>
          )}
        </div>

        {/* 저장 버튼 */}
        <button
          onClick={handleSaveImage}
          disabled={!image || savedImages.length >= 15}
          style={{
            marginTop: '1rem',
            width: '100%',
            height: '3rem',
            backgroundColor: image && savedImages.length < 15 ? 'black' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: image && savedImages.length < 15 ? 'pointer' : 'not-allowed'
          }}
        >
          이미지 저장
        </button>
        {/* 선택된 이미지 삭제 버튼 */}
        <button
          onClick={handleDeleteSelected}
          disabled={selectedIndex === null}
          style={{
            marginTop: '0.5rem',
            width: '100%',
            height: '3rem',
            backgroundColor: selectedIndex !== null ? 'red' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedIndex !== null ? 'pointer' : 'not-allowed'
          }}
        >
          선택된 이미지 삭제
        </button>

        {/* 저장된 이미지 */}
        <div style={{
          marginTop: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem'
        }}>
          {savedImages.map((img, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                border: selectedIndex === index ? '3px solid blue' : '2px solid #ccc',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (mode === 'closet') {
    return (
      <div style={{
        width,
        background: '#ffffff',
        color: 'black',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxSizing: 'border-box',
        boxShadow: 'inset 6px 0px 0px rgba(0, 0, 0, 0.1)',
        height: '100vh', 
        overflowY: 'auto' 
      }}>
        <h2 style={{marginLeft: '1rem', marginBottom:'0px'}}>나의 옷장</h2>
        <p style={{marginLeft: '1rem', marginTop:'0px'}}>쇼핑몰에서 원하는 옷을 담아보세요</p>
        {/* 저장된 이미지 */}
        <div style={{
          marginTop: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem'
        }}>
          {savedImages.map((img, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                border: selectedIndex === index ? '3px solid blue' : '2px solid #ccc',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            />
          ))}
        </div>
        {/* 선택된 이미지 삭제 버튼 */}
        <button
          onClick={handleDeleteSelected}
          disabled={selectedIndex === null}
          style={{
            marginTop: '0.5rem',
            width: '100%',
            height: '3rem',
            backgroundColor: selectedIndex !== null ? 'red' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedIndex !== null ? 'pointer' : 'not-allowed'
          }}
        >
          선택된 이미지 삭제
        </button>
        {/* 선택된 이미지 입어보기버튼 */}
        <button
          //onClick
          disabled={selectedIndex === null}
          style={{
            marginTop: '0.5rem',
            width: '100%',
            height: '3rem',
            backgroundColor: selectedIndex !== null ? 'black' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedIndex !== null ? 'pointer' : 'not-allowed'
          }}
        >
          입어보기
        </button>
        <h2 style={{marginLeft: '1rem', marginBottom:'0px', marginTop: '5rem'}}>소장 의류</h2>
        <p style={{marginLeft: '1rem', marginTop:'0px'}}>내가 가지고있는 의류</p>
        {/* 내 옷 이미지 업로드 */}
        <label style={{
          display: 'block',
          marginTop: '1rem',
          padding: '0.5rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          textAlign: 'center',
          cursor: 'pointer'
        }}>
          내 옷 업로드
          <input
            type="file"
            accept="image/*"
            onChange={handleMyClosetImageUpload}
            style={{ display: 'none' }}
          />
        </label>
        {/* 내 옷 이미지 목록 */}
        <div style={{
          marginTop: '1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem'
        }}>
          {myClosetImages.map((img, index) => (
            <div
              key={`my-${index}`}
              onClick={() => handleMyClosetImageClick(index)}
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                border: selectedMyClosetIndex === index ? '3px solid green' : '2px solid #ccc',
                boxSizing: 'border-box',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
        <button
          onClick={handleDeleteMyClosetImage}
          disabled={selectedMyClosetIndex === null}
          style={{
            marginTop: '0.5rem',
            width: '100%',
            height: '3rem',
            backgroundColor: selectedMyClosetIndex !== null ? 'red' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedMyClosetIndex !== null ? 'pointer' : 'not-allowed'
          }}
        >
          내 옷 이미지 삭제
        </button>
        <button
          //onClick
          disabled={selectedMyClosetIndex === null}
          style={{
            marginTop: '0.5rem',
            width: '100%',
            height: '3rem',
            backgroundColor: selectedMyClosetIndex !== null ? 'black' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedMyClosetIndex !== null ? 'pointer' : 'not-allowed'
          }}
        >
          입어보기
        </button>
      </div>
    )
  }

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

  if (mode === 'main') {
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
                  <div>
                      <input
                          type="text"
                          value={id}
                          onChange={(e) => setId(e.target.value)}
                          style={inputStyle}
                          placeholder='아이디를 입력하세요.'
                      />
                  </div>

                  <div style={{position: 'relative'}}>
                      <input
                          type={passwordHide ? 'password' : 'text'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={inputStyle}
                          placeholder='비밀번호를 입력하세요.'
                      />
                      {passwordHide ?(
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
                      )
                      }
                  </div>

                  <div>
                      <button
                          style={{
                              fontSize: '14px',
                              width: '100%',
                              height: '3rem',
                              color: 'white',
                              background: 'black'
                      }}
                      >로그인
                      </button>
                  </div>

                  <div>
                      <button
                          style={{
                              fontSize: '14px',
                              width: '100%',
                              height: '3rem',
                              color: 'white',
                              background: 'black'
                      }}
                      >카카오 로그인
                      </button>
                  </div>

                  <div>
                      <button onClick={() => {
                          setMode('signUp')
                          navigate('/signUp')
                      }}
                              style={{
                                  fontSize: '14px',
                                  width: '100%',
                                  height: '3rem',
                                  color: 'white',
                                  background: 'black'
                      }}
                      >서비스가 처음이신가요? 회원가입 하기
                      </button>
                  </div>

                  <div>
                      <label
                          style={{
                              marginLeft: '5.5rem',
                              background: 'none',
                              cursor: 'pointer',
                              fontSize: '14px'
                      }}
                      >아이디 찾기
                      </label>
                      <label
                          style={{
                              marginLeft: '1rem',
                              background: 'none',
                              cursor: 'pointer',
                              fontSize: '14px'
                      }}
                      >비밀번호 찾기
                      </label>
                  </div>
              </div>
          </div>
      )
  }

  if (mode === 'signUp') {
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

              {/* 공통 폼 영역 */}
              <div style={{
                  width: '70%',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  marginTop: '5   rem'
              }}>

                  <div>
                      <p style={{margin: 0}}>사용하실 아이디를 입력하세요.</p>
                      <input
                          type="text"
                          value={signUpId}
                          onChange={(e) => idHandleChange(e)}
                          style={{...inputStyle, borderColor: idError? 'red' : '#ccc'}}
                          placeholder='아이디를 입력하세요.'
                      />
                      <p style={{fontSize: 12,fontWeight: 200, margin: 0}}>영문과 숫자를 사용하여 8자리 이상 입력해주세요.</p>
                      <p style={{fontSize: 12,fontWeight: 200, margin: 0}}>특수문자는 사용이 불가합니다.</p>
                      <p style={{fontSize: 12, color: 'red'}}>{idError}</p>
                  </div>
                  <div>
                      <p style={{margin: 0}}>사용하실 비밀번호를 입력해주세요.</p>
                      <div style={{position: 'relative', width: '100%'}}>
                          <input
                              type={signUpPasswordHide ? 'password' : 'text'}
                              value={signUpPassword}
                              onChange={(e) => passwordHandleChange(e)}
                              style={{...inputStyle, borderColor: passwordError? 'red' : '#ccc'}}
                              placeholder='비밀번호를 입력하세요.'
                          />
                          {signUpPasswordHide ?(
                              <AiFillEyeInvisible
                                  onClick={signUpTogglePasswordVisibility}
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
                                  onClick={signUpTogglePasswordVisibility}
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
                          )
                          }
                          <p style={{fontSize: 12,fontWeight: 200, margin: 0}}>영문과 숫자를 사용하여 8자리 이상 입력해주세요.</p>
                      </div>
                      <p style={{fontSize: 12, color: 'red'}}>{passwordError}</p>
                  </div>

                  <div>
                      <p style={{margin: 0}}>이메일을 입력하세요.</p>
                      <input
                          type="text"
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
                      >회원가입 하기
                      </button>
                  </div>
              </div>
          </div>
      )
  }
    if (mode == 'body'){
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
                {/* 공통 폼 영역 */}
                <div style={{
                    width: '70%',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    marginTop: '5   rem'
                }}>

                    <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '5rem' }}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <p style={{ margin: 0 }}>키를 입력하세요</p>
                            <input
                                type="text"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                style={inputStyle}
                            />
                            <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>cm</span>
                        </div>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <p style={{ margin: 0 }}>몸무게를 입력하세요</p>
                            <input
                                type="text"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                style={inputStyle}
                            />
                            <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>kg</span>
                        </div>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <p style={{ margin: 0 }}>허리둘레를 입력하세요</p>
                            <input
                                type="text"
                                value={waist}
                                onChange={(e) => setWaist(e.target.value)}
                                style={inputStyle}
                            />
                            <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>inch</span>
                        </div>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <p style={{ margin: 0 }}>다리길이를 입력하세요</p>
                            <input
                                type="text"
                                value={leg}
                                onChange={(e) => setLeg(e.target.value)}
                                style={inputStyle}
                            />
                            <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>cm</span>
                        </div>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <p style={{ margin: 0 }}>어깨너비 입력하세요</p>
                            <input
                                type="text"
                                value={shoulder}
                                onChange={(e) => setShoulder(e.target.value)}
                                style={inputStyle}
                            />
                            <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>inch</span>
                        </div>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <p style={{ margin: 0 }}>골반너비를 입력하세요</p>
                            <input
                                type="text"
                                value={pelvis}
                                onChange={(e) => setPelvis(e.target.value)}
                                style={inputStyle}
                            />
                            <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>inch</span>
                        </div>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <p style={{ margin: 0 }}>가슴둘레를 입력하세요</p>
                            <input
                                type="text"
                                value={chest}
                                onChange={(e) => setChest(e.target.value)}
                                style={inputStyle}
                            />
                            <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>inch</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }





    if (mode === 'setting') {
    return (
      <div style={{
        width,
        background: '#ffffff',
        color: 'black',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxSizing: 'border-box',
        boxShadow: 'inset 6px 0px 0px rgba(0, 0, 0, 0.1)',
        height: '100vh', 
        overflowY: 'auto' }}>
        <div>
          <h2>설정</h2>
          <div>
            {[
              { label: '회원 정보', value: 'member' },
              { label: '약관 및 정책', value: 'policy' },
              { label: '오류 신고', value: 'report' }
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setSettingTab(value)}
                style={{
                  width: '100%',
                  height: '3rem',
                  marginTop: '1rem',
                  color: settingTab === value ? 'white' : 'black',
                  background: settingTab === value ? 'black' : 'white',
                  border: '2px solid black'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default DynamicSidebar

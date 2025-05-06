import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function DynamicSidebar({ mode, setUrl, inputValue, setInputValue }) {
  const navigate = useNavigate()
  const [gender, setGender] = useState('') // 성별 상태
  const [clothes, setClothes] = useState('') // 상의 하의
  const [image, setImage] = useState(null)
  const [savedImages, setSavedImages] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const dropRef = useRef()
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
    if (image && savedImages.length < 9) {
      setSavedImages(prev => [...prev, image])
      setImage(null)
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
        boxShadow: 'inset 6px 0px 0px rgba(0, 0, 0, 0.1)'
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
          disabled={!image || savedImages.length >= 9}
          style={{
            marginTop: '1rem',
            width: '100%',
            height: '3rem',
            backgroundColor: image && savedImages.length < 9 ? 'black' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: image && savedImages.length < 9 ? 'pointer' : 'not-allowed'
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

        {/* 저장된 이미지 9개 */}
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

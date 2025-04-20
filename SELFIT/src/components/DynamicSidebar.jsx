function DynamicSidebar({ mode, setUrl, inputValue, setInputValue }) {
  const width = '250px' 

  if (mode === 'iframe') {
    return (
      <div style={{
        width,
        background: '#282c34',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxSizing: 'border-box'
      }}>
        <h2>사이트 목록</h2>
        <button onClick={() => setUrl('https://www.musinsa.com/main/musinsa/recommend?gf=A')}>
          무신사
        </button>
        <button onClick={() => setUrl('https://www.29cm.co.kr/')}>
          29CM
        </button>
      </div>
    )
  }

  if (mode === 'input') {
    return (
      <div style={{
        width,
        background: '#333',
        color: 'white',
        padding: '1rem',
        boxSizing: 'border-box'
      }}>
        <h2>입력 모드</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: '95%',
            padding: '0.3rem',
            fontSize: '1rem'
          }}
        />
      </div>
    )
  }

  return (
    <div style={{
      width,
      background: '#444',
      color: 'white',
      padding: '1rem',
      boxSizing: 'border-box'
    }}>
      <h2>기타 모드</h2>
      <p>{mode} 모드 내용은 나중에 추가</p>
    </div>
  )
}

export default DynamicSidebar
import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')

  const handleClick = (site) => {
    setUrl(site)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Sidebar */}
      <div style={{
        width: '200px',
        background: '#282c34',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxSizing: 'border-box'
      }}>
        <h2>사이트 목록</h2>
        <button onClick={() => handleClick('https://www.musinsa.com/main/musinsa/recommend?gf=A')}>
          무신사
        </button>
        <button onClick={() => handleClick('https://www.29cm.co.kr/')}>
          29CM
        </button>
      </div>

      {/* Main Area */}
      <div style={{
        flex: 1,
        height: '100%',
        boxSizing: 'border-box'
      }}>
        {url ? (
          <iframe
            src={url}
            title="외부사이트"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block'
            }}
          />
        ) : (
          <div style={{
            padding: '2rem',
            height: '100%',
            boxSizing: 'border-box'
          }}>
            <h1>외부 웹사이트 보기</h1>
            <p>왼쪽 사이드바의 버튼을 눌러 사이트를 열어보세요.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App


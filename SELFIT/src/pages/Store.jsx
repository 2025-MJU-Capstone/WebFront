import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Store({ url, setUrl }) {
  const navigate = useNavigate()
  useEffect(() => {
    if (!url) {
      setUrl('')  
    }
  }, [])
  const siteList = [
    { name: '무신사', url: 'https://www.musinsa.com/main/musinsa/recommend?gf=A' },
    { name: '29CM', url: 'https://www.29cm.co.kr/' },
    { name: '지그재그', url: 'https://zigzag.kr/' },
    { name: 'W CONCEPT', url: 'https://display.wconcept.co.kr/rn/women' }
  ]

  const handleSelect = (siteUrl) => {
    setUrl(siteUrl)
  }

  return (
    <div style={{ flex: 1, height: '100%', boxSizing: 'border-box' }}>
      <button className="back-btn" onClick={() => setUrl('')}>
          <b>뒤로 가기</b>
      </button>

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
        <div style={{ padding: '2rem' }}>
          <h1>스토어 보기</h1>
          <p>사이트를 선택해 주세요:</p>
          {siteList.map((site) => (
            <button
              key={site.name}
              onClick={() => handleSelect(site.url)}
              style={{
                margin: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {site.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Store

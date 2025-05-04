import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './Store.css' // CSS 파일 import

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
  ]

  const handleSelect = (siteUrl) => {
    setUrl(siteUrl)
  }

  return (
    <div className="store-container">
      <button className="back-btn" onClick={() => setUrl('')}>
        <b>뒤로 가기</b>
      </button>

      {!url ? (
        <div className="store-selection">
          <h1>스토어 보기</h1>
          <p>사이트를 선택해 주세요:</p>

          <div className="site-grid">
            {siteList.map((site) => (
              <button
                key={site.name}
                onClick={() => handleSelect(site.url)}
                className="site-button"
              >
                {site.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <iframe
          src={url}
          title="외부사이트"
          className="store-iframe"
        />
      )}
    </div>
  )
}

export default Store


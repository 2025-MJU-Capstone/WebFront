function Store({ url }) {
  return (
    <div style={{ flex: 1, height: '100%', boxSizing: 'border-box' }}>
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
          <p>사이드바에서 사이트를 선택해 주세요.</p>
        </div>
      )}
    </div>
  )
}

export default Store

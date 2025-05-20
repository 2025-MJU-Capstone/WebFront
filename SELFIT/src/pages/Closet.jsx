import React from 'react'

const Closet = () => {
  return (
    <div style={styles.mainContainer}>
      <div style={styles.closetContent}>
        <div style={styles.previewBox}></div>

        <div style={styles.historySection}>
          <p style={styles.sectionTitle}>피팅 히스토리</p>
          <div style={styles.historyScroll}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} style={styles.historyItem}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  // 전체 페이지에서 사이드바 제외한 메인 영역
  mainContainer: {
    marginLeft: '470px', // 사이드바 너비만큼 밀어주기
    padding: '2rem 1rem',
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    boxSizing: 'border-box',
  },

  // 가운데 정렬을 위한 컨텐츠 박스
  closetContent: {
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  previewBox: {
    width: '170%',
    paddingTop: '170%', // 정사각형
    backgroundColor: '#e5e5e5',
    borderRadius: '8px',
    marginBottom: '1rem'
  },
  historySection: {
    width: '110%',
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    boxShadow: '0 0 3px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    marginBottom: '0.5rem'
  },
  historyScroll: {
    display: 'flex',
    overflowX: 'auto',
    gap: '0.5rem'
  },
  historyItem: {
    minWidth: '80px',
    height: '80px',
    backgroundColor: '#e5e5e5',
    borderRadius: '4px',
    flexShrink: 0
  }
}

export default Closet


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@google/model-viewer'; 


const Closet = () => {
  const [currentFittedModel, setCurrentFittedModel] = useState(null); // 현재 입혀진 모델
  const [history, setHistory] = useState([]); // 히스토리 목록

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    // 현재 fitted model 불러오기 (localStorage)
    const fittedModelUrl = localStorage.getItem('fittedModelUrl');
    if (fittedModelUrl) {
      setCurrentFittedModel(fittedModelUrl);
    }

    // 히스토리 불러오기
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/fitting/list', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHistory(res.data); // FittedImageDto 리스트
      } catch (error) {
        console.error('피팅 히스토리 불러오기 실패', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={styles.mainContainer}>
      <div style={styles.closetContent}>
        {/* 현재 피팅된 3D 모델 */}
        <div style={styles.previewBox}>
          {currentFittedModel ? (
            <model-viewer
              key={Date.now()}
              src={`http://localhost:8080/proxy/model?url=${encodeURIComponent(currentFittedModel)}`}  
              alt="현재 피팅 모델"
              auto-rotate
              camera-controls
              style={{ position: 'absolute',  top: 0,left: 0,width: '100%', height: '100%' }}
            />
          ) : (
            <div style={styles.emptyPreview}>현재 피팅된 모델이 없습니다.</div>
          )}
        </div>

        {/* 피팅 히스토리 */}
        <div style={styles.historySection}>
          <p style={styles.sectionTitle}>피팅 히스토리</p>
          <div style={styles.historyScroll}>
            {history.map((modelUrl, i) => {
              const hasModel = modelUrl && modelUrl.trim() !== "";

              return (
                <div
                  key={i}
                  style={{
                    ...styles.historyItem,
                    backgroundColor: hasModel ? '#cce5ff' : '#e5e5e5',  // 색상 변경
                    cursor: hasModel ? 'pointer' : 'not-allowed'
                  }}
                  onClick={() => {
                    if (!hasModel) return;  // 모델 없는 경우 클릭 막기
                    localStorage.setItem('fittedModelUrl', modelUrl);
                    window.location.reload();
                  }}
                >
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: hasModel ? 'black' : '#888'
                  }}>
                    {hasModel ? `View ${i + 1}` : 'No model'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    marginLeft: '470px',
    padding: '2rem 1rem',
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    boxSizing: 'border-box',
  },
  closetContent: {
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  previewBox: {
    width: '170%',
    paddingTop: '170%',
    backgroundColor: '#e5e5e5',
    borderRadius: '8px',
    marginBottom: '1rem',
    position: 'relative',
    overflow: 'hidden'
  },
  emptyPreview: {
    width: '100%',
    height: '100%',
    fontSize: '1rem',
    color: '#888',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    flexShrink: 0,
    overflow: 'hidden'
  }
};

export default Closet;



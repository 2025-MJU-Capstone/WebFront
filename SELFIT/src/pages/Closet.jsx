import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@google/model-viewer';

const Closet = () => {
  const [currentFittedModel, setCurrentFittedModel] = useState(null);
  const [currentFittedImage2D, setCurrentFittedImage2D] = useState(null);
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem('accessToken');

  // Function to update the displayed model and image
  const updateDisplay = (modelUrl, imageUrl) => {
    setCurrentFittedModel(modelUrl);
    setCurrentFittedImage2D(imageUrl);
    localStorage.setItem('fittedModelUrl', modelUrl);
    localStorage.setItem('fittedImage2D', imageUrl);
  };

  useEffect(() => {
    // 최초 로컬스토리지 로드
    const fittedModelUrl = localStorage.getItem('fittedModelUrl');
    const fittedImage2D = localStorage.getItem('fittedImage2D');
    if (fittedModelUrl || fittedImage2D) {
      updateDisplay(fittedModelUrl, fittedImage2D);
    }

    // 히스토리 불러오기
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/fitting/list', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data);

        // **Option 1: Automatically display the most recent history item on load**
        // If you want to show the latest fitting result from history when the component mounts
        if (res.data.length > 0) {
          const latestFitting = res.data[0]; // Assuming the first item is the most recent
          updateDisplay(latestFitting.fitted_3D_url, latestFitting.fitted_2D_url);
        }

      } catch (error) {
        console.error('피팅 히스토리 불러오기 실패', error);
      }
    };

    fetchHistory();
  }, []);

  // This function should be called when new fitting data is received
  // For example, after a successful API call for a new fitting
  const handleNewFittingResult = (data) => {
    updateDisplay(data.fitted_3D_url, data.fitted_2D_url);
    // Also, add the new fitting to the history
    setHistory(prevHistory => [data, ...prevHistory]);
  };

  return (
    <div style={styles.mainContainer}>
      {/* Result Box: 3D + 2D */}
      <div style={styles.resultContainer}>
        <div style={styles.previewBox}>
          {currentFittedModel ? (
            <model-viewer
              key={Date.now()}
              src={`http://localhost:8080/proxy/model?url=${encodeURIComponent(currentFittedModel)}`}
              alt="현재 피팅 모델"
              auto-rotate
              camera-controls
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          ) : (
            <div style={styles.emptyPreview}>현재 피팅된 모델이 없습니다.</div>
          )}
        </div>

        <div style={styles.previewBox}>
          {currentFittedImage2D ? (
            <img
              src={currentFittedImage2D}
              alt="현재 2D 피팅 결과"
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
            />
          ) : (
            <div style={styles.emptyPreview}>2D 이미지가 없습니다.</div>
          )}
        </div>
      </div>

      {/* Fitting History */}
      <div style={styles.historySection}>
        <p style={styles.sectionTitle}>피팅 히스토리</p>
        <div style={styles.historyScroll}>
          {history.map((item, i) => {
            const hasModel = item.fitted_3D_url && item.fitted_3D_url.trim() !== "";
            return (
              <div
                key={i}
                style={{
                  ...styles.historyItem,
                  backgroundColor: hasModel ? '#cce5ff' : '#e5e5e5',
                  cursor: hasModel ? 'pointer' : 'not-allowed'
                }}
                onClick={() => {
                  if (!hasModel) return;
                  updateDisplay(item.fitted_3D_url, item.fitted_2D_url);
                }}
              >
                {item.fitted_2D_url ? (
                  <img
                    src={item.fitted_2D_url}
                    alt={`피팅 썸네일 ${i}`}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 30%',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', color: '#888'
                  }}>No Image</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    padding: '2rem 1rem',
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    boxSizing: 'border-box',
    width: 'calc(100% - 550px)',
    height: '100%'
  },
  resultContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    margin: '0 auto 2rem auto',
    width: '100%',
    height: '70vh',
  },
  previewBox: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    borderRadius: '8px',
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
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0
  },
  historySection: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    boxShadow: '0 0 3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '2rem auto 0 auto',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    marginBottom: '0.5rem'
  },
  historyScroll: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
  },
  historyItem: {
    width: '80px',
    height: '80px',
    backgroundColor: '#e5e5e5',
    borderRadius: '4px',
    overflow: 'hidden'
  }
};

export default Closet;







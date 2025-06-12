import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IframeSidebar({
  clothes, setClothes, savedImages, setSavedImages,
  dropRef, width
}) {
  const [image, setImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 최초 로딩 시 저장된 이미지 목록 조회
  useEffect(() => {
    async function fetchSavedImages() {
      try {
        const response = await axios.get('http://localhost:8080/api/clothes/provide', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const urls = response.data.map(item => item.path); // S3 URL만 뽑기
        setSavedImages(urls);
      } catch (error) {
        console.error('이미지 목록 불러오기 실패', error);
      }
    }
    fetchSavedImages();
  }, []);

  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData.items;
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          const url = URL.createObjectURL(blob);
          setImage({ url, file: blob });
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImage({ url, file });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 저장 (업로드)
  const handleSaveImage = async () => {
  if (!image?.file || !clothes) {
    alert('카테고리를 먼저 선택하세요.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('file', image.file);

    let type;
    if (clothes === '상의') type = 'TOP';
    else if (clothes === '하의') type = 'BOTTOM';
    else if (clothes === '원피스') type = 'ONEPIECE';

    const response = await axios.post(`http://localhost:8080/api/clothes/upload?type=${type}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const s3Url = response.data.data;
    setSavedImages(prev => [...prev, s3Url]);
    setImage(null);
  } catch (error) {
    console.error('이미지 저장 실패', error);
    alert('이미지 저장 실패');
  }
};

  const handleImageClick = (index) => {
    setSelectedIndex(prev => (prev === index ? null : index));
  };

  // 삭제 (URL 기반)
const handleDeleteSelected = async () => {
  if (selectedIndex === null) return;

  const imageUrlToDelete = savedImages[selectedIndex]; // 풀 URL 형태로 저장된 값

  try {
    await axios.delete(`http://localhost:8080/api/clothes/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        imageURL: imageUrlToDelete, // 쿼리스트링으로 보냄
      }
    });

    setSavedImages(prev => prev.filter((_, i) => i !== selectedIndex));
    setSelectedIndex(null);
  } catch (error) {
    console.error('이미지 삭제 실패', error);
    alert('이미지 삭제 실패');
  }
};



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
      <h2 style={{ marginLeft: '1rem', marginBottom: '0px' }}>옷 검색</h2>
      <p style={{ marginLeft: '1rem', marginTop: '0px' }}>의류 사이트에서 원하는 옷을 담아보세요</p>

      <div style={{ display: 'flex', gap: '1rem', width: '100%', height: '3rem' }}>
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
        <button
          onClick={() => setClothes('원피스')}
          style={{
            flex: 1,
            padding: '0.5rem',
            backgroundColor: clothes === '원피스' ? 'black' : 'white',
            color: clothes === '원피스' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
          원피스
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
            src={image.url}
            alt="업로드된 이미지"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        ) : (
          <p>이미지를 드래그하거나<br />Ctrl+V로 붙여넣기 해주세요</p>
        )}
      </div>

      <button
        onClick={handleSaveImage}
        disabled={!image || savedImages.length >= 15 || !clothes} // clothes 선택 안되면 비활성화
        style={{
          marginTop: '1rem',
          width: '100%',
          height: '3rem',
          backgroundColor: (image && savedImages.length < 15 && clothes) ? 'black' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: (image && savedImages.length < 15 && clothes) ? 'pointer' : 'not-allowed'
        }}
      >
        이미지 저장
      </button>

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
  );
}

export default IframeSidebar;




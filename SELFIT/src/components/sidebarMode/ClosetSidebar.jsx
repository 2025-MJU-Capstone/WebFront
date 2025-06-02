import React from 'react';
import axios from 'axios';

function ClosetSidebar({
  savedImages, setSavedImages, selectedIndex, setSelectedIndex,
  myClosetImages, setMyClosetImages, selectedMyClosetIndex, setSelectedMyClosetIndex,
  width
}) {

  const handleImageClick = (index) => {
    setSelectedIndex(prev => (prev === index ? null : index));
  };

  const handleDeleteSelected = async () => {
    if (selectedIndex !== null) {
      try {
        // 담은 옷 삭제
        await axios.delete(`http://localhost:8080/api/clothes/upload/${selectedIndex}`);
        setSavedImages(prev => prev.filter((_, i) => i !== selectedIndex));
        setSelectedIndex(null);
      } catch (error) {
        console.error('담은 옷 삭제 실패', error);
      }
    }
  };

  const handleMyClosetImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      try {
        const formData = new FormData();
        files.forEach(file => {
          formData.append('file', file);
        });
        // 소장 의류 업로드
        await axios.post('http://localhost:8080/api/wardrobe/photos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        // 임시 프론트 반영
        const newImageUrls = files.map(file => URL.createObjectURL(file));
        setMyClosetImages(prev => [...prev, ...newImageUrls]);
      } catch (error) {
        console.error('소장 의류 업로드 실패', error);
      }
    }
  };

  const handleMyClosetImageClick = (index) => {
    setSelectedMyClosetIndex(prev => (prev === index ? null : index));
  };

  const handleDeleteMyClosetImage = async () => {
    if (selectedMyClosetIndex !== null) {
      try {
        // 소장 의류 삭제
        await axios.delete(`http://localhost:8080/api/wardrobe/photos/${selectedMyClosetIndex}`);
        setMyClosetImages(prev => prev.filter((_, i) => i !== selectedMyClosetIndex));
        setSelectedMyClosetIndex(null);
      } catch (error) {
        console.error('소장 의류 삭제 실패', error);
      }
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
      {/* 담은 옷 */}
      <h2>나의 옷장</h2>
      <p>쇼핑몰에서 원하는 옷을 담아보세요</p>
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

      {/* 소장 의류 */}
      <h2>소장 의류</h2>
      <p>내가 가지고 있는 의류</p>

      <label style={{
        display: 'block',
        marginTop: '1rem',
        padding: '0.5rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        textAlign: 'center',
        cursor: 'pointer'
      }}>
        내 옷 업로드
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleMyClosetImageUpload}
          style={{ display: 'none' }}
        />
      </label>

      <div style={{
        marginTop: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem'
      }}>
        {myClosetImages.map((img, index) => (
          <div
            key={`my-${index}`}
            onClick={() => handleMyClosetImageClick(index)}
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '100%',
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              border: selectedMyClosetIndex === index ? '3px solid green' : '2px solid #ccc',
              boxSizing: 'border-box',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>

      <button
        onClick={handleDeleteMyClosetImage}
        disabled={selectedMyClosetIndex === null}
        style={{
          marginTop: '0.5rem',
          width: '100%',
          height: '3rem',
          backgroundColor: selectedMyClosetIndex !== null ? 'red' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: selectedMyClosetIndex !== null ? 'pointer' : 'not-allowed'
        }}
      >
        내 옷 이미지 삭제
      </button>
    </div>
  );
}

export default ClosetSidebar;


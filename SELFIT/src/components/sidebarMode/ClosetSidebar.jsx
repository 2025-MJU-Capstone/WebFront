import React from 'react';

function ClosetSidebar({
  savedImages, setSavedImages, selectedIndex, setSelectedIndex,
  myClosetImages, setMyClosetImages, selectedMyClosetIndex, setSelectedMyClosetIndex,
  width
}) {

  const handleImageClick = (index) => {
    setSelectedIndex(prev => (prev === index ? null : index));
  };

  const handleDeleteSelected = () => {
    if (selectedIndex !== null) {
      setSavedImages(prev => prev.filter((_, i) => i !== selectedIndex));
      setSelectedIndex(null);
    }
  };

  const handleMyClosetImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setMyClosetImages(prev => [...prev, url]);
    }
  };

  const handleMyClosetImageClick = (index) => {
    setSelectedMyClosetIndex(prev => (prev === index ? null : index));
  };

  const handleDeleteMyClosetImage = () => {
    if (selectedMyClosetIndex !== null) {
      setMyClosetImages(prev => prev.filter((_, i) => i !== selectedMyClosetIndex));
      setSelectedMyClosetIndex(null);
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
      <h2 style={{ marginLeft: '1rem', marginBottom: '0px' }}>나의 옷장</h2>
      <p style={{ marginLeft: '1rem', marginTop: '0px' }}>쇼핑몰에서 원하는 옷을 담아보세요</p>

      {/* 저장된 이미지 */}
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

      {/* 선택된 이미지 삭제 버튼 */}
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

      {/* 입어보기 버튼 */}
      <button
        disabled={selectedIndex === null}
        style={{
          marginTop: '0.5rem',
          width: '100%',
          height: '3rem',
          backgroundColor: selectedIndex !== null ? 'black' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: selectedIndex !== null ? 'pointer' : 'not-allowed'
        }}
      >
        입어보기
      </button>

      <h2 style={{ marginLeft: '1rem', marginBottom: '0px', marginTop: '5rem' }}>소장 의류</h2>
      <p style={{ marginLeft: '1rem', marginTop: '0px' }}>내가 가지고 있는 의류</p>

      {/* 내 옷 이미지 업로드 */}
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
          onChange={handleMyClosetImageUpload}
          style={{ display: 'none' }}
        />
      </label>

      {/* 내 옷 이미지 목록 */}
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

      {/* 내 옷 이미지 삭제 버튼 */}
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

      {/* 입어보기 버튼 */}
      <button
        disabled={selectedMyClosetIndex === null}
        style={{
          marginTop: '0.5rem',
          width: '100%',
          height: '3rem',
          backgroundColor: selectedMyClosetIndex !== null ? 'black' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: selectedMyClosetIndex !== null ? 'pointer' : 'not-allowed'
        }}
      >
        입어보기
      </button>
    </div>
  );
}

export default ClosetSidebar;

import React from 'react';

function IframeSidebar({
  clothes, setClothes, image, setImage,
  savedImages, setSavedImages, selectedIndex, setSelectedIndex,
  dropRef, width
}) {

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSaveImage = () => {
    if (image && savedImages.length < 15) {
      setSavedImages(prev => [...prev, image]);
      setImage(null);
    }
  };

  const handleImageClick = (index) => {
    setSelectedIndex(prev => (prev === index ? null : index));
  };

  const handleDeleteSelected = () => {
    if (selectedIndex !== null) {
      setSavedImages(prev => prev.filter((_, i) => i !== selectedIndex));
      setSelectedIndex(null);
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
      <div style={{ display: 'flex', gap: '1.5rem', width: '100%', height: '3rem' }}>
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
            src={image}
            alt="업로드된 이미지"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        ) : (
          <p>이미지를 드래그하거나<br />Ctrl+V로 붙여넣기 해주세요</p>
        )}
      </div>

      <button
        onClick={handleSaveImage}
        disabled={!image || savedImages.length >= 15}
        style={{
          marginTop: '1rem',
          width: '100%',
          height: '3rem',
          backgroundColor: image && savedImages.length < 15 ? 'black' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: image && savedImages.length < 15 ? 'pointer' : 'not-allowed'
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

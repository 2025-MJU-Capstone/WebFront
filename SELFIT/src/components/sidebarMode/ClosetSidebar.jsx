import React from 'react';
import axios from 'axios';

function ClosetSidebar({
  savedImages, setSavedImages, selectedIndex, setSelectedIndex,
  myClosetImages, setMyClosetImages, selectedMyClosetIndex, setSelectedMyClosetIndex,
  width
}) {
  const token = localStorage.getItem('accessToken');

  const handleImageClick = (index) => {
    setSelectedIndex(prev => (prev === index ? null : index));
  };

  const handleDeleteSelected = async () => {
    if (selectedIndex !== null) {
      try {
        const imageUrlToDelete = savedImages[selectedIndex];
        await axios.delete(`http://localhost:8080/api/clothes/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { imageURL: imageUrlToDelete }
        });

        // 삭제 후 savedImages 재로딩
        const res = await axios.get(`http://localhost:8080/api/clothes/provide`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const updatedUrls = res.data.map(item => item.path);
        setSavedImages(updatedUrls);
        setSelectedIndex(null);
      } catch (error) {
        console.error('담은 옷 삭제 실패', error);
      }
    }
  };

  const handleMyClosetImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      // 업로드 타입 입력받게 (TOP/BOTTOM/ONEPIECE 등등)
      const clothesType = window.prompt('옷 종류 입력 (TOP, BOTTOM, ONEPIECE)').toUpperCase();

      await axios.post(`http://localhost:8080/api/wardrobe/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        params: { type: clothesType }
      });

      // 업로드 성공 후 wardrobe 데이터 재로딩
      const res = await axios.get(`http://localhost:8080/api/wardrobe/provide`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedUrls = res.data.map(item => item.path);
      setMyClosetImages(updatedUrls);
    } catch (error) {
      console.error('소장 의류 업로드 실패', error);
    }
  };

  const handleMyClosetImageClick = (index) => {
    setSelectedMyClosetIndex(prev => (prev === index ? null : index));
  };

  const handleDeleteMyClosetImage = async () => {
    if (selectedMyClosetIndex !== null) {
      try {
        const imageUrlToDelete = myClosetImages[selectedMyClosetIndex];
        await axios.delete(`http://localhost:8080/api/wardrobe/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { imageURL: imageUrlToDelete }
        });

        // 삭제 후 wardrobe 데이터 재로딩
        const res = await axios.get(`http://localhost:8080/api/wardrobe/provide`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const updatedUrls = res.data.map(item => item.path);
        setMyClosetImages(updatedUrls);
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
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
          onChange={handleMyClosetImageUpload}
          style={{ display: 'none' }}
        />
      </label>

      <div style={{
        marginTop: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
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
              cursor: 'pointer',
              boxSizing: 'border-box'
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



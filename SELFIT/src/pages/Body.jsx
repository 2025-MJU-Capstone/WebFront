import { useNavigate } from 'react-router-dom';
import './Body.css';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import '@google/model-viewer'; 

function Body({ height, weight, waist, leg, shoulder, pelvis, chest }) {
  const navigate = useNavigate();
  const [upImage, setUpImage] = useState(null);
  const [downImage, setDownImage] = useState(null);
  const [rightImage, setRightImage] = useState(null);
  const [leftImage, setLeftImage] = useState(null);
  const [gender, setGender] = useState(null);  // 성별 추가
  const [isValid, setIsValid] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);

  const dropRef = useRef();

  useEffect(() => {
    if (upImage && downImage && rightImage && leftImage && gender) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [upImage, downImage, rightImage, leftImage, gender]);

  const handleDrop = (e, setImage) => {
    if (window.location.pathname.split('/').pop() !== 'body') return;
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };

  const handleDragOver = (e) => {
    if (window.location.pathname.split('/').pop() !== 'body') return;
    e.preventDefault();
  };

  const handleAnalyze = async () => {
    try {
      const bodySizeData = {
        height, weight, waist, leg, shoulder, pelvis, chest
      };

      console.log("Body Size Data:", bodySizeData);

      // 1. 신체 사이즈 저장
      await axios.post('http://localhost:8080/api/body/size', bodySizeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        }
      });

      // 2. 전신 사진 업로드
      const formData = new FormData();
      const files = [upImage, downImage, rightImage, leftImage];
      files.forEach(file => {
        formData.append('files', file);
      });

      await axios.post('http://localhost:8080/api/body/shape', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      // 3. 성별 기반 신체 사이즈 분석 요청
      const resSize = await axios.post(`http://localhost:8080/api/body/size/photo?gender=${gender}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log("신체 사이즈 분석 결과:", resSize.data.data);

      // 4. 3D 모델 요청
      const res3D = await axios.post('http://localhost:8080/api/body/3d', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      const modelUrl = res3D.data.data; // ApiResult<String> → 3D model URL
      setModelUrl(modelUrl);

      alert('신체정보, 사진 등록, 3D 모델 생성 성공!');
    } catch (error) {
      console.error(error);
      alert('업로드 실패: ' + (error.response?.data?.message || '서버 오류'));
    }
  };

  if (!modelUrl) {
    return (
      <div>
        <h1 style={{ marginLeft: "30px" }}>본인의 사진을 등록해보세요</h1>
        <h3 style={{ marginLeft: "30px" }}>드래그하여 사진을 등록하세요</h3>

        <div className="body-container">
          <div className="body-flex">
            {[{ image: upImage, label: "앞모습", setImage: setUpImage },
              { image: downImage, label: "뒷모습", setImage: setDownImage },
              { image: rightImage, label: "오른 모습", setImage: setRightImage },
              { image: leftImage, label: "왼 모습", setImage: setLeftImage }
            ].map((item, index) => (
              <div
                key={index}
                className="image"
                onClick={() => item.setImage(null)}
                ref={dropRef}
                onDrop={(e) => handleDrop(e, item.setImage)}
                onDragOver={handleDragOver}
              >
                {item.image ? (
                  <img
                    src={URL.createObjectURL(item.image)}
                    alt="업로드된 이미지"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <p className="image-font">{item.label}</p>
                )}
              </div>
            ))}
          </div>

          <p style={{ marginLeft: "30px" }}>전신이 다 나오는 사진을 넣어주세요.</p>

          {/* 성별 선택 추가 */}
          <div style={{ margin: '20px' }}>
            <p>성별을 선택하세요:</p>
            <label>
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              남성
            </label>
            <label style={{ marginLeft: '20px' }}>
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
              여성
            </label>
          </div>

          <div className="bottom-container">
            <p>체형을 분석하는 데 시간이 걸릴 수 있어요.</p>
            <p style={{ marginLeft: "28%" }}>사진이 없다면 실시간으로 촬영 후 분석이 가능해요.</p>
          </div>

          <button
            className={isValid ? "btn-active" : "btn-inactive"}
            disabled={!isValid}
            onClick={handleAnalyze}
          >
            실시간 분석하기
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="body-flex2">
          {/* 3D 모델 보여주는 iframe */}
          <model-viewer
            src={`http://localhost:8080/proxy/model?url=${encodeURIComponent(modelUrl)}`}
            alt="3D model"
            auto-rotate
            camera-controls
            style={{ width: '100%', height: '600px' }}
          />
          <div>
            <h2 style={{ marginTop: "0px" }}>나의 3D 체형 모델</h2>
            <p>3D 모델링된 내 신체를 확인할 수 있어요.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;




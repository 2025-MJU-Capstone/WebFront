import React from 'react';

function BodySidebar({
  height, setHeight,
  weight, setWeight,
  waist, setWaist,
  leg, setLeg,
  shoulder, setShoulder,
  pelvis, setPelvis,
  chest, setChest,
  width
}) {
  const inputStyle = {
    width: '100%',
    height: '3rem',
    padding: '0.4rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      width,
      background: '#ffffff',
      color: 'black',
      padding: '1rem',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      boxShadow: 'inset 6px 0px 0px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        width: '70%',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        marginTop: '5rem'
      }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p style={{ margin: 0 }}>키를 입력하세요</p>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={inputStyle}
          />
          <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>cm</span>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p style={{ margin: 0 }}>몸무게를 입력하세요</p>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={inputStyle}
          />
          <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>kg</span>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p style={{ margin: 0 }}>허리둘레를 입력하세요</p>
          <input
            type="text"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            style={inputStyle}
          />
          <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>inch</span>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p style={{ margin: 0 }}>다리길이를 입력하세요</p>
          <input
            type="text"
            value={leg}
            onChange={(e) => setLeg(e.target.value)}
            style={inputStyle}
          />
          <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>cm</span>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p style={{ margin: 0 }}>어깨너비 입력하세요</p>
          <input
            type="text"
            value={shoulder}
            onChange={(e) => setShoulder(e.target.value)}
            style={inputStyle}
          />
          <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>inch</span>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p style={{ margin: 0 }}>골반너비를 입력하세요</p>
          <input
            type="text"
            value={pelvis}
            onChange={(e) => setPelvis(e.target.value)}
            style={inputStyle}
          />
          <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>inch</span>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <p style={{ margin: 0 }}>가슴둘레를 입력하세요</p>
          <input
            type="text"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
            style={inputStyle}
          />
          <span style={{ position: 'absolute', right: '10px', top: '50%', color: 'black' }}>inch</span>
        </div>
      </div>
    </div>
  );
}

export default BodySidebar;

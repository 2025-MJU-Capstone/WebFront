function SettingSidebar({ width, settingTab, setSettingTab }) {
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
      <div>
        <h2>설정</h2>
        <div>
          {[
            { label: '회원 정보', value: 'member' },
            { label: '약관 및 정책', value: 'policy' },
            { label: '오류 신고', value: 'report' }
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSettingTab(value)}
              style={{
                width: '100%',
                height: '3rem',
                marginTop: '1rem',
                color: settingTab === value ? 'white' : 'black',
                background: settingTab === value ? 'black' : 'white',
                border: '2px solid black',
                cursor: 'pointer'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingSidebar;


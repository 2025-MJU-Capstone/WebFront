function Main({ mode, inputValue }) {
  return (
    <div style={{ flex: 1, padding: '2rem' }}>
      {mode === 'main' && (
        <>
          <h1>환영합니다 👋</h1>
        </>
      )}

      {mode === 'input' && (
        <>
          <h1>입력 결과</h1>
          <p>입력한 값: {inputValue}</p>
        </>
      )}

      {mode !== 'main' && mode !== 'input' && (
        <>
          <h1>{mode} 모드</h1>
          <p>아직 구현되지 않은 모드입니다.</p>
        </>
      )}
    </div>
  )
}

export default Main
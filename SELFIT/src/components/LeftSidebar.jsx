import { Link } from 'react-router-dom'

function LeftSidebar({ setMode }) {
  return (
    <div style={{
      width: '70px',
      background: '#1e1e1e',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      boxSizing: 'border-box'
    }}>
      <h3>메뉴</h3>
      <button onClick={() => setMode('iframe')}>1</button>
      <button onClick={() => setMode('input')}>2</button>
      <button onClick={() => setMode('somethingElse')}>3</button>
      <button onClick={() => setMode('anotherThing')}>4</button>
    </div>
  )
}

export default LeftSidebar
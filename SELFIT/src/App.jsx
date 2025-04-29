import { useState } from 'react'
import './App.css'
import LeftSidebar from './components/LeftSidebar'
import DynamicSidebar from './components/DynamicSidebar'
import Store from './pages/Store'
import Main from './pages/Main'

function App() {
  const [mode, setMode] = useState('main') 
  const [url, setUrl] = useState('')
  const [inputValue, setInputValue] = useState('')

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <LeftSidebar setMode={setMode} />
      <DynamicSidebar
        mode={mode}
        setUrl={setUrl}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      {mode === 'iframe' ? (
        <Store url={url} />
      ) : (
        <Main mode={mode} inputValue={inputValue} />
      )}
    </div>
  )
}

export default App

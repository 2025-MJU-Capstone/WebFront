import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LeftSidebar from './components/LeftSidebar'
import DynamicSidebar from './components/DynamicSidebar'
import Store from './pages/Store'
import Main from './pages/Main'
import Body from './pages/Body'
import Closet from './pages/Closet'
import Setting from './pages/Setting'
import SignUp from './pages/SignUp'

function App() {
  const [mode, setMode] = useState('main')
  const [url, setUrl] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [settingTab, setSettingTab] = useState('member');

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <LeftSidebar setMode={setMode} />
        <DynamicSidebar
          mode={mode}
          setUrl={setUrl}
          setMode={setMode}
          inputValue={inputValue}
          setInputValue={setInputValue}
          settingTab={settingTab}
          setSettingTab={setSettingTab}
        />
        <Routes>
          <Route path="/" element={<Main mode={mode} inputValue={inputValue} />} />
          <Route path="/store" element={<Store url={url} setUrl={setUrl} />} />
          <Route path="/closet" element={<Closet mode={mode}/>} />
          <Route path="/body" element={<Body/>}></Route>
          <Route path="/setting" element={<Setting tab={settingTab} />}/>
          <Route path="/signUp" element={<SignUp></SignUp>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

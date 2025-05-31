import { useState,useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import './App.css'
import LeftSidebar from './components/LeftSidebar'
import DynamicSidebar from './components/DynamicSidebar'
import Store from './pages/Store'
import Main from './pages/Main'
import Body from './pages/Body'
import Closet from './pages/Closet'
import Setting from './pages/Setting'
import SignUp from './pages/SignUp'
import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



function PrivateRoute({ children, setMode }) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    setMode && setMode('main');
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const [mode, setMode] = useState('main')
  const [url, setUrl] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [settingTab, setSettingTab] = useState('member');

  //신체 정보 상태 추가
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [leg, setLeg] = useState('');
  const [shoulder, setShoulder] = useState('');
  const [pelvis, setPelvis] = useState('');
  const [chest, setChest] = useState('');

  // 자동 로그인 유지
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setMode('main'); // 비로그인 상태일 경우 로그인 탭으로 유지
    }
  }, []);

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
          height={height}
          setHeight={setHeight}
          weight={weight}
          setWeight={setWeight}
          waist={waist}
          setWaist={setWaist}
          leg={leg}
          setLeg={setLeg}
          shoulder={shoulder}
          setShoulder={setShoulder}
          pelvis={pelvis}
          setPelvis={setPelvis}
          chest={chest}
          setChest={setChest}
        />
       <Routes>
          {/* 비로그인 사용자도 접근 가능 */}
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<Main mode={mode} inputValue={inputValue} />} />
          {/* 로그인한 사용자만 접근 가능 */}
          <Route path="/store" element={<PrivateRoute setMode={setMode}><Store url={url} setUrl={setUrl} /></PrivateRoute>} />
          <Route path="/closet" element={<PrivateRoute setMode={setMode}><Closet mode={mode} /></PrivateRoute>} />
          <Route path="/body" element={<PrivateRoute setMode={setMode}><Body 
                height={height}
                weight={weight}
                waist={waist}
                leg={leg}
                shoulder={shoulder}
                pelvis={pelvis}
                chest={chest}/></PrivateRoute>} />
          <Route path="/setting" element={<PrivateRoute setMode={setMode}><Setting tab={settingTab} /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

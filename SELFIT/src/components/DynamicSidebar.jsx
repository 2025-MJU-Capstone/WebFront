import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IframeSidebar from './sidebarMode/IframeSidebar';
import ClosetSidebar from './sidebarMode/ClosetSidebar';
import MainSidebar from './sidebarMode/MainSidebar';
import SignUpSidebar from './sidebarMode/SignUpSidebar';
import BodySidebar from './sidebarMode/BodySidebar';
import SettingSidebar from './sidebarMode/SettingSidebar';

function DynamicSidebar({
  mode, setMode, setUrl, inputValue, setInputValue, settingTab, setSettingTab,
  height, setHeight, weight, setWeight, waist, setWaist, leg, setLeg,
  shoulder, setShoulder, pelvis, setPelvis, chest, setChest
}) {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [clothes, setClothes] = useState('');
  const [image, setImage] = useState(null);
  const [savedImages, setSavedImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [signUpId, setSignUpId] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPasswordHide, setSignUpPasswordHide] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [idError, setIdError] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [myClosetImages, setMyClosetImages] = useState([]);
  const [selectedMyClosetIndex, setSelectedMyClosetIndex] = useState(null);

  const dropRef = useRef();
  const width = '400px';

  useEffect(() => {
    if (mode !== 'iframe') return;
    const handlePaste = (e) => {
      const items = e.clipboardData.items;
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          const url = URL.createObjectURL(blob);
          setImage(url);
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [mode]);

  const props = {
    navigate, mode, setMode, setUrl, inputValue, setInputValue, settingTab, setSettingTab,
    gender, setGender, clothes, setClothes, image, setImage,
    savedImages, setSavedImages, selectedIndex, setSelectedIndex,
    id, setId, password, setPassword, passwordHide, setPasswordHide,
    signUpId, setSignUpId, signUpPassword, setSignUpPassword, signUpPasswordHide, setSignUpPasswordHide,
    passwordError, setPasswordError, idError, setIdError, signUpEmail, setSignUpEmail,
    myClosetImages, setMyClosetImages, selectedMyClosetIndex, setSelectedMyClosetIndex,
    height, setHeight, weight, setWeight, waist, setWaist, leg, setLeg,
    shoulder, setShoulder, pelvis, setPelvis, chest, setChest,
    dropRef, width
  };

  switch (mode) {
    case 'iframe':
      return <IframeSidebar {...props} />;
    case 'closet':
      return <ClosetSidebar {...props} />;
    case 'main':
      return <MainSidebar {...props} />;
    case 'signUp':
      return <SignUpSidebar {...props} />;
    case 'body':
      return <BodySidebar {...props} />;
    case 'setting':
      return <SettingSidebar {...props} />;
    default:
      return null;
  }
}

export default DynamicSidebar;



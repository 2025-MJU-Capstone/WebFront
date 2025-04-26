import { Link } from 'react-router-dom'
import { useState } from 'react';
import Body from "../assets/Body.svg"
import Closet from "../assets/Closet.svg"
import Search from "../assets/Search.svg"
import Setting from "../assets/Setting.svg"
import sBody from "../assets/select_Body.svg"
import sCloset from "../assets/select_Closet.svg"
import sSearch from "../assets/select_Search.svg"
import sSetting from "../assets/select_Setting.svg"

function LeftSidebar({ setMode }) {
  const [selectedButton, setSelectedButton] = useState(null);
  return (
    <div style={{
      width: '70px',
      background: '#ffffff',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '7rem',
      boxSizing: 'border-box',
    }}>
      <h3>메뉴</h3>
      
      <img
          src={selectedButton === 'body' ? sBody : Body}
          alt="Body"
          width="40px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedButton('body');
            setMode('input')
          }}
        />
      <img
          src={selectedButton === 'search' ? sSearch : Search}
          alt="Store"
          width="40px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedButton('search');
            setMode('iframe')
          }}
        />
       <img
          src={selectedButton === 'closet' ? sCloset : Closet}
          alt="Closet"
          width="40px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedButton('closet');
            setMode('somethingElse')
          }}
        /> 
      <img
          src={selectedButton === 'setting' ? sSetting : Setting}
          alt="Setting"
          width="40px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedButton('setting');
            setMode('anotherThing')
          }}
        />
    </div>
  )
}

export default LeftSidebar
import { Link } from 'react-router-dom'
import Body from "../assets/BOdy.svg"
import Closet from "../assets/Closet.svg"
import Search from "../assets/Search.svg"
import Setting from "../assets/Setting.svg"

function LeftSidebar({ setMode }) {
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
          src={Body}
          alt="Body"
          width="40px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setMode('input')
          }}
        />
      <img
          src={Search}
          alt="Store"
          width="40px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setMode('iframe')
          }}
        />
       <img
          src={Closet}
          alt="Closet"
          width="40px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setMode('somethingElse')
          }}
        /> 
      <img
          src={Setting}
          alt="Setting"
          width="40px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setMode('anotherThing')
          }}
        />
    </div>
  )
}

export default LeftSidebar
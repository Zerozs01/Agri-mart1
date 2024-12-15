import React,{ useState} from 'react';
import Footer from '../components/Footer/Footer'
import Main from '../components/Ai/Main'
import About1 from '../components/Ai/About1'
import LoginPopup from "../Login/LoginPopup";


function Chat() {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <div>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
        <Main />
        <About1 />
        <Footer setShowLogin={setShowLogin}/>
    </div>
  )
}

export default Chat
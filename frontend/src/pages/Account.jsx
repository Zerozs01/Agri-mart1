/** @format */
import Navbar2 from "../components/Navbar/Navbar2";
import React,{ useState} from 'react';
import Footer from "../components/Footer/Footer";
import LoginPopup from "../Login/LoginPopup";




function Account() {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <div>
       {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <Navbar2 setShowLogin={setShowLogin}/>
      <h1 className="text-light">Account</h1>
     
      <Footer setShowLogin={setShowLogin}/>
    </div>
  );
}

export default Account;

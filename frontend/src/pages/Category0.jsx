import React,{ useState} from 'react';
import Footer from "../components/Footer/Footer";
import Navbar2 from "../components/Navbar/Navbar2";
import LoginPopup from '../Login/LoginPopup';
import Header1 from '../components/Header/Header1';


function Category0() {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <div>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <Navbar2/>
      <h1 className="text-light">Category</h1>
      <Footer setShowLogin={setShowLogin}/>
    </div>
   
  );
}

export default Category0;

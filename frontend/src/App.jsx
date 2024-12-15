import './App.css';
import Footer from './components/Footer/Footer';
import Navbar2 from './components/Navbar/Navbar2';
import Slider from './components/Slider/Slider';
import React,{ useState} from 'react';
import LoginPopup from './Login/LoginPopup';
import FoodDisplay from './components/FoodDisplay/FoodDisplay';
import ExploreMenu from './components/ExploreMenu/ExploreMenu';
import FreeSpace from './components/FreeSpace/FreeSpace';






function App() {

  const [category,setCategory] = useState("All");
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>

    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <Navbar2/>
   <Slider/>
  <ExploreMenu category={category} setCategory={setCategory}/>
   <FoodDisplay category={category}/>
   <FreeSpace />
   <Footer setShowLogin={setShowLogin}/>
    </>
  );
}

export default App;

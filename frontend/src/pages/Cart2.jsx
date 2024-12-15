/** @format */

import React, { useState } from "react";
import CartHeader from "./Cart/CartHeader";
import Footer from "../components/Footer/Footer";
import LoginPopup from "../Login/LoginPopup";
import Cart0 from "./Cart2/Cart0";
import FreeSpace from "../components/FreeSpace/FreeSpace";

function Cart2() {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <div>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <CartHeader />
   <Cart0/>
   <FreeSpace/>
      <Footer setShowLogin={setShowLogin} />
    </div>
  );
}

export default Cart2;

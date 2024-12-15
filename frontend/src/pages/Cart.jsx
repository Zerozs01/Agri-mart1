
import React, { useState } from "react";
import Navbar2 from "../components/Navbar/Navbar2";

import TabMenu from "./Cart/TabMenu";
import CartSection from "./Cart/CartSection";
import OrderStatus from "./Cart/OrderStatus";
import Footer from "../components/Footer/Footer";
import CartHeader from "./Cart/CartHeader";
import LoginPopup from "../Login/LoginPopup";
function Cart() {
  // ใช้ useState เพื่อควบคุม tab ที่แสดง
  const [activeTab, setActiveTab] = useState('cart');
  const [showLogin,setShowLogin] = useState(false)
  // ฟังก์ชันสำหรับการเปลี่ยน tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <CartHeader/>
      
      {/* ส่งฟังก์ชัน handleTabChange ไปที่ TabMenu */}
      <TabMenu onTabChange={handleTabChange} />

      {/* เงื่อนไขการแสดงผล */}
      {activeTab === 'cart' && <CartSection />}
      {activeTab === 'order-status' && <OrderStatus />}

      <Footer setShowLogin={setShowLogin}/>
    </div>
  );
}

export default Cart;
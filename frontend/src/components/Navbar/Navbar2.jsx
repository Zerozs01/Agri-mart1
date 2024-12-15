/** @format */

import React, { useState, useEffect ,useContext} from "react";
import { Link } from "react-router-dom";
import "./Navbar2.css";


function Navbar2({ setShowLogin }) {
  const [isFixedTop, setIsFixedTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // ตรวจสอบว่าเป็นหน้าจอที่มีความกว้าง >= 769px
      if (window.innerWidth >= 769) {
        if (window.scrollY > 100) {
          setIsFixedTop(true);
        } else {
          setIsFixedTop(false);
        }
      } else {
        setIsFixedTop(false);
      }
    };

    // เพิ่ม event listener สำหรับ scroll
    window.addEventListener("scroll", handleScroll);
    // เพิ่ม event listener สำหรับ resize
    window.addEventListener("resize", handleScroll);

    // ลบ event listener เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);
  

  return (
    <>
      <nav className="navbar bg-white sticky-top ">
        <div className="container">
          <Link to="/" className="nav-link">
            <span className="logo fw-bolder text-gradient">Agri mart</span>
          </Link>
          <div className={`search-bar ${isFixedTop ? "fix-top" : ""}`} style={isFixedTop ? { left: "50%", transform: "translateX(-50%)" } : {}}>
            <input
              className="text"
              type="text"
              placeholder="what did you want..."
            />
            <button className="button border">ค้นหา</button>
             
          </div>
          
        </div>
      </nav>
    </>
  );
}

export default Navbar2;

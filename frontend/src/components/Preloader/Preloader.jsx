// src/components/Preloader.jsx
import React from "react";
import "./Preloader.css"; // สร้างไฟล์ CSS สำหรับอนิเมชั่น

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Preloader;

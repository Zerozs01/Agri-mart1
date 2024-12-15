import React from "react";
import "./Category.css";

function Category() {
  return (
    <div>
    <section className="category py-3">
      <div className="container ">
        <div className="fancy-title title-border title-center mb-3">
          <h4 className="text-align">Category</h4>
        </div>
        {/* Service Section */}
        <div className="container border rounded p-2 text-light">
          <div className="row ">
            <div className="col-md-4 text-center mb-4">
              <br />
              <h3 className="" style={{ color: '#7695FF' }}>ปรับสภาพพื้นที่</h3>
              <p className=" ">
              อุปกรณ์สำหรับการเตรียมพื้นที่และปรับปรุงคุณภาพดิน
                <br />
                อาทิ เครื่องไถนา,พรวนดิน,ปุ๋ย,เครื่องตรวจสภาพดิน
                <br />ระบบชลประทาน
              </p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <br />
             
              <h3 style={{ color: '#9DBDFF' }}>ปลูกและดูแลพืช </h3>
              <p className="  ">
              อุปกรณ์ที่ใช้ในการปลูกพืชและดูแลพืชให้เติบโต
                <br />
                อาทิ เครื่องปลูกและหว่านเมล็ด,อุปกรณ์ให้น้ำให้ปุ๋ย
                <br />ป้องกันศัตรูพืช
              </p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <br />
             
              <h3 style={{ color: '#FF9874' }}>เก็บเกี่ยวและการจัดการผลผลิต</h3>
              <p className="  ">
              อุปกรณ์การแปรรูป/การเก็บรักษาคุณภาพผลผลิต
                <br />
               อาทิ เครื่องเก็บเกี่ยวข้าว เครื่องอบแห้ง ลังพลาสติก <br />ตาข่ายคลุมผลผลิต
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    <br />
      <br />
      <br />
      <br /> 
    </div>
    
  );
}

export default Category;

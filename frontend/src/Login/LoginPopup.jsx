import React, { useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import './LoginPopup.css' 
import { StoreContext } from '../context/StoreContext' 
import axios from "axios"

function LoginPopup({setShowLogin}) {
  const {url, setToken} = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    
    if (currState === "Login") {
        newUrl += "/api/user/login";
    } else {
        newUrl += "/api/user/register";
    }
    
    try {
        const response = await axios.post(newUrl, data);
        
        if (response.data.success) {
            // decode token เพื่อดึง userId
            const decodedToken = jwtDecode(response.data.token);
            
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            
            // ดึงสินค้าในตะกร้าจาก localStorage
            const localCartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
            
            if (Object.keys(localCartItems).length > 0) {
                // ส่ง local cart items ไปยัง backend
                const syncResponse = await axios.post(
                    `${url}/api/cart/sync`,
                    { 
                        userId: decodedToken.id,  // เพิ่ม userId ในการส่งข้อมูล
                        cartItems: localCartItems 
                    },
                    {
                        headers: {
                            token: response.data.token
                        }
                    }
                );
                
                // อัปเดต localStorage กับข้อมูลตะกร้าล่าสุดจาก backend
                if (syncResponse.data.success) {
                    localStorage.setItem('cartItems', JSON.stringify(syncResponse.data.cartData));
                }
            }
            
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
};

  return (
    <div className='login-popup text-light'>
    <form onSubmit={onLogin} className='login-popup-container '>
      <div className='login-popup-title'>
        <h2>{currState}</h2>
        <i onClick={()=>setShowLogin(false)}className="bi bi-x-lg"></i>
      </div>
      <div className='login-popup-inputs'>
        {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name"required/>}
        
        <input name='email'onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email"required/>
        <input name='password' onChange={onChangeHandler} value={data.password} type="password"placeholder='Your password'required/>
      </div>
      <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
      <div className='login-popup-condition'>
        <input type="checkbox"required/>
        <p>By continuling, i agree to the terms of use & privacy policy.</p>
      </div>
      {currState==="Login"?  <p> Create a new account?<span onClick={()=> setCurrState("Sign Up")}>Click here</span></p>:
      <p>Already have an account?<span onClick={()=> setCurrState("Login")}>Login here</span></p>}
    

      </form>
      </div>
  )
}

export default LoginPopup
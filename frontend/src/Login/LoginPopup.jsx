import React , {useContext, useState} from 'react'
import './LoginPopup.css'
import { StoreContext } from '../context/StoreContext'
import axios from "axios"
function LoginPopup({setShowLogin}) {

const {url,setToken,clearTempCart} = useContext(StoreContext)


const [currState,setCurrState] = useState("Login")
 const[data,setData] = useState({
  name:"",
  email:"",
  password:""
 })
 const onChangeHandler = (event) => {
const name = event.target.name;
const value = event.target.value;
setData(data=>({...data,[name]:value}))
}

const onLogin = async (event)=>{
 event.preventDefault()
 let newUrl = url;
 if(currState ==="Login"){
  newUrl += "/api/user/login"
 }
 else{
  newUrl += "/api/user/register"
 }

 try {
  const response = await axios.post(newUrl,data);
  if(response.data.success){
   console.log("Login successful");
   setToken(response.data.token);
   localStorage.setItem("token",response.data.token);
   
   if (typeof clearTempCart === 'function') {
    console.log("Calling clearTempCart");
    clearTempCart();
    setShowLogin(false);
    
    setTimeout(() => {
     window.location.reload();
    }, 100);
   } else {
    console.error("clearTempCart is not a function:", clearTempCart);
   }
  }
  else{
    alert(response.data.message)
  }
 } catch (error) {
  console.error("Login error:", error);
 }
}

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
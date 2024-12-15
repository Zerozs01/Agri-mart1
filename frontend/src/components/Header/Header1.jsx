import React from 'react'
import { Link, useLocation } from "react-router-dom";
import './Header1.css'

function Header1() {
  return (
    <>
      <nav className="navbar">
       
          <div className="search-bar fixed-top ">
            <input
              className="text border text-align center"
              type="text"
              placeholder="what did you want..."
            ></input>
            <button className="button border">ค้นหา</button>
          </div>
       
       
      </nav>
    </>
  )
}

export default Header1
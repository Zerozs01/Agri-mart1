/** @format */

import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Footer.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";


function Footer({ setShowLogin }) {
  const { token, logout } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <footer className="footer1 fixed-bottom">
      <nav className="">
        <Link
          to="/Chat"
          className={`fs-2 ${isActive("/Chat") ? " text-gradient" : ""}`}
        >
          <i className="bi bi-chat-dots"></i>
        </Link>

        <Link
          to="/myorders"
          className={`fs-2 ${isActive("/myorders") ? " text-gradient" : ""}`}
        >
          <i className ="bi bi-box-seam"></i>
        </Link>

        <Link
          to="/"
          className={`fs-2 ${isActive("/") ? "active text-gradient" : ""}`}
        >
          <i className="bi bi-house-fill"></i>
        </Link>

        <Link
          to="/cart2"
          className={`fs-2 ${
            isActive("/cart2") ? "active text-gradient " : ""
          }`}
        >
          <i className="bi bi-cart3"></i>
        </Link>
        {!token?<Link>
          {" "}
          <i
            onClick={() => setShowLogin(true)}
            className="bi bi-person fs-2 text-light"
          ></i>
        </Link>:<Link className="navbar-profile">
          <img src={assets.profile_icon} alt=""/>
          <ul className="nav-profile-dropdown">
           
            <li onClick={handleLogout}><img src={assets.logout_icon} alt=""/><p className="t">Logout</p></li>
          </ul>
          </Link>}
        
      </nav>
    </footer>
  );
}

export default Footer;

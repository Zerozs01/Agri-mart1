import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Function to determine if a given path is the current path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
     <nav className="navbar mr-auto navbar-light bg-white py-3">
        <div className="container px-2 navbar-expand-lg">
          <Link to="/" className="nav-link">
            <span className="fw-bolder text-gradient">Agri mart</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder ">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${isActive('/') ? 'active text-gradient' : ''}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Category0" className={`nav-link ${isActive('/Category0') ? 'active text-gradient' : ''}`}>
                 Category 
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className={`nav-link ${isActive('/cart') ? 'active text-gradient' : ''}`}>
                  Cart
                </Link>
              </li>
            
              <li className="nav-item">
                <Link to="/Chat" className={`nav-link ${isActive('/Chat') ? 'active text-gradient' : ''}`}>
                  Chat
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/Account" className={`nav-link ${isActive('/Account') ? 'active text-gradient' : ''}`}>
                  Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     </>
  )
}

export default Navbar
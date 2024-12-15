/** @format */

import React, { useState, useEffect ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar2.css";
import { StoreContext } from "../../context/StoreContext";

function Navbar2() {
  const [isFixedTop, setIsFixedTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { food_list } = useContext(StoreContext);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // ฟังก์ชันค้นหา
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = food_list.filter(item => 
      item.name.toLowerCase().includes(term.toLowerCase()) ||
      item.description.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(results);
    setShowResults(true);
  };

  // เลือกสินค้าจากผลการค้นหา
  const handleSelectItem = (itemId) => {
    setSearchTerm('');
    setShowResults(false);
    // นำทางไปยังหน้ารายละเอียดสินค้า (ถ้ามี)
    navigate(`/product/${itemId}`);
  };

  return (
    <nav className="navbar bg-white sticky-top">
      <div className="container">
        <Link to="/" className="nav-link">
          <span className="logo fw-bolder text-gradient">Agri mart</span>
        </Link>
        <div 
          className={`search-container ${isFixedTop ? "fix-top" : ""}`} 
          style={isFixedTop ? { left: "50%", transform: "translateX(-50%)" } : {}}
        >
          <div className="search-bar">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => setShowResults(true)}
            />
            <button className="search-button">
              ค้นหา
            </button>
          </div>

          {/* ผลการค้นหา */}
          {showResults && searchResults.length > 0 && (
            <div className="search-results ">
              {searchResults.map((item) => (
                <div
                  key={item._id}
                  className="search-result-item "
                  onClick={() => handleSelectItem(item._id)}
                >
                  
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">{item.price}BATH</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar2;

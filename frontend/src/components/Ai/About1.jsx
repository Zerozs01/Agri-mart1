import React, { useState, useContext } from 'react';
import { Context } from "../../context/context.jsx";
import "./Main.css"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      window.location.href = `https://www.google.com/search?q=${searchTerm}`;
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="type here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

const About1 = () => {
  const {
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <header className="bg-light py-3">
      <div className="container-fluid px-3 pb-1">
        <div className="row gx-5">
          <div className="col-xxl">
            <div className="text-xxl-center">
              <h2 className="">
                
               
                <div className="">
                  {!showResult ? (
                    <></>
                  ) : (
                    <div className="result">
                        <span className='result-title fw-bolder'>"{recentPrompt}"</span>
                        <div className="result-data">
                          <hr/>
                        <span className="text-gradient d-inline fw-bolder ">Result</span>
                            {/* Conditional rendering based on loading */}
                            {loading
                                ? <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <h5 dangerouslySetInnerHTML={{ __html: resultData }}></h5>}
                        </div>
                    </div>
                  )}
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default About1;

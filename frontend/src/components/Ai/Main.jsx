import React, { useState, useContext } from "react";
import { Context } from "../../context/context.jsx";
import "./Main.css";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <div className="main">
      <div className=" bg-gradient-primary-to-secondary  ">
        <div className="text-uppercase fw-light badge">
          SEARCH &middot; WHAT &middot; YOUWANT
        </div>
      </div>

      <header className="py-3 action ">
        <div className="container-fluid px-3 ">
          <div className="">
            <div className="">
              <div className=" text-xxl-center">
                <div className="fs-3 fw-light text-muted text-center"></div>
                <h1 className="display-3  mb-3 ">
                  <span className="display-3 text-gradient d-inline ">
                    Agri Mart ai{" "}
                  </span>
                </h1>

                <div className="search-bar fs-1 display-3 ">
                  <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text"
                    placeholder=""
                    className="search-input  fs-1 fw-light px-5 "
                  />
                  <button
                    className=" px-4 fw-bolder search-button text-align  "
                    onClick={() => onSent()}
                  >
                    search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Main;

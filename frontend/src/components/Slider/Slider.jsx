// src/components/Slider.jsx
import React from "react";

import './Slider.css';

const Slider = () => {
  return (
    <section id="slider" className="slider">
      <div className="carousel slide" data-bs-ride="carousel" id="mySlider">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#mySlider"
            data-bs-slide-to="0"
            className="active"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#mySlider"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#mySlider"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item carousel-image-1 active">
            <div className="container ">
              <div className="dark-overlay ">
                <div className="carousel-caption d-none d-sm-block">
                  <h1 className="display-3 "></h1>
                  <p>
                  
                    <br />
                 
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item carousel-image-2">
            <div className="container">
              <div className="dark-overlay">
                <div className="carousel-caption d-none d-sm-block">
                  <h1 className="display-3"></h1>
                  <p>
                
                    <br />
                   
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item carousel-image-3">
            <div className="container">
              <div className="dark-overlay"></div>
              <div className="carousel-caption d-none d-sm-block">
                <h1 className="display-3"></h1>
                <p>
                
                  <br />
              
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mySlider"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mySlider"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Slider;

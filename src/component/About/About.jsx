// About.jsx
import React from 'react';
import Footer from '../footer/Footer';
import './About.css';

export default function About() {
  return (
    <>
      <section className="about-page">
        <div className="container">
          <div className="about-main">
            <img
              className="about-main__img"
              src="/about/about-main.jpg"
              alt="car-renting"
            />
            <div className="about-main__text">
              <h3>About Company</h3>
              <h2>You start the engine and your adventure begins</h2>
              <p>
              Experience seamless car rental with our diverse fleet of vehicles, perfect for any journey. Enjoy competitive 
              rates, reliable service, and 24/7 support for a hassle-free rental experience.
              </p>
              <div className="about-main__text__icons">
                <div className="about-main__text__icons__box">
                  <img src="/about/icon1.png" alt="car-icon" />
                  <span>
                    <h4>20</h4>
                    <p>Car Types</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src="/about/icon2.png" alt="car-icon" />
                  <span>
                    <h4>85</h4>
                    <p>Rental Outlets</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src="/about/icon3.png" alt="car-icon" className="last-fk" />
                  <span>
                    <h4>75</h4>
                    <p>Repair Shop</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="book-banner">
        <div className="book-banner__overlay"></div>
        <div className="container">
          <div className="text-content">
            <h2>Book a car by getting in touch with us</h2>
            <span>
              <i className="bi bi-telephone"></i>
              <h3>(02141)-894789</h3>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

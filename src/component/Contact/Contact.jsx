// Contact.jsx
import React from 'react';
import Footer from '../footer/Footer';
import './Contact.css';

export default function Contact() {
  return (
    <>
      <section className="contact-page">
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Need additional information?</h2>
              <p>
                We are here to assist you with all your car rental needs. With over 15 years of experience, our team of experts is ready to provide you with the best service possible.
              </p>
              <a href="tel:1234567869">
                <i className="bi bi-telephone-fill"></i>&nbsp; (02141)-894789
              </a>
              <a href="mailto:carrental@xyz.com">
                <i className="bi bi-envelope-at-fill"></i>&nbsp; carrental@xyz.com
              </a>
              <a href="/">
                <i className="bi bi-geo-alt-fill"></i>&nbsp; Mumbai, Maharashtra
              </a>
            </div>
            <div className="contact-div__form">
              <form>
                <label>
                  Full Name <b>*</b>
                </label>
                <input type="text" placeholder="Firstname and Last name" required></input>

                <label>
                  Email <b>*</b>
                </label>
                <input type="email" placeholder="youremail@example.com" required></input>

                <label>
                  Tell us about it <b>*</b>
                </label>
                <textarea placeholder="Write Here.." required></textarea>

                <button type="submit">
                  <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Send Message
                </button>
              </form>
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

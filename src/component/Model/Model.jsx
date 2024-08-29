import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../footer/Footer';
import BookCar from '../BookCars/BookCar';
import './Model.css';

export default function Model() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

 

  useEffect(() => {
    axios.get('http://localhost:5000/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the car data!', error);
      });
  }, []);

  const handleBookRide = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
   
  };

  return (
    <>
      <section className="models-section">
        <div className="container">
          <div className="models-grid">
            {cars.map((car, index) => (
              <div className="models-card" key={index}>
                <div className="models-card__img">
                  <img src={`http://localhost:5000${car.imagePath}`} alt={`${car.name}_img`} />
                </div>
                <div className="models-card__descr">
                  <div className="models-card__header">
                    <div className="models-card__name">
                      <p>{car.name}</p>
                      <span>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </span>
                    </div>
                    <div className="models-card__price">
                      <h4>₹{car.price}</h4>
                      <p>/per hr</p>
                    </div>
                  </div>
                  <div className="models-card__details">
                    <span>
                      <i className="fa-solid fa-car-side"></i> &nbsp; <b>Seats:</b> {car.seats}
                    </span>
                    <span>
                      <i className="fa-solid fa-car-side"></i> &nbsp; <b>Fuel:</b> {car.fuel}
                    </span>
                  </div>
                  
                    <button className="bookridebtn" onClick={() => handleBookRide(car)}>
                      Book Ride 
                    </button>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
        

        <br></br><br></br><br></br><br></br>
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
        </div><br></br>
        <Footer />
      </section>

      {modalOpen && (
        <BookCar car={selectedCar} closeModal={() => setModalOpen(false)} />
      )}
    </>
  );
}

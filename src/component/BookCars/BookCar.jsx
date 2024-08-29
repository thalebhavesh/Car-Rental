import { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';
import './BookCar.css';

function BookCar() {
  const [modal, setModal] = useState(false);
  const [cars, setCars] = useState([]);
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carSeats, setCarSeats] = useState("");
  const [carFuel, setCarFuel] = useState("");

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/cars')
      .then(response => {
        console.log('Car data fetched:', response.data);
        setCars(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cars!', error);
      });
  }, []);

  const handleName = (e) => setName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleZip = (e) => setZipCode(e.target.value);

  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal);
      errorMsg.style.display = "none";
    }
  };

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  const confirmBooking = (e) => {
    e.preventDefault();

    const bookingData = {
      carType,
      pickUp,
      dropOff,
      pickTime,
      dropTime,
      carImg,
      name,
      lastName,
      phone,
      age,
      email,
      address,
      city,
      zipcode
    };

    axios.post('http://localhost:5000/bookcar', bookingData)
      .then(response => {
        console.log(response.data);
        setModal(!modal);
        const doneMsg = document.querySelector(".booking-done");
        doneMsg.style.display = "flex";
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const handleCar = (e) => {
    setCarType(e.target.value);
    const selectedCar = cars.find(car => car.name === e.target.value);
    setCarImg(selectedCar ? selectedCar.imagePath : '');
    setCarPrice(selectedCar ? selectedCar.price : '');
    setCarSeats(selectedCar ? selectedCar.seats : '');
    setCarFuel(selectedCar ? selectedCar.fuel : '');
  };

  const handlePick = (e) => setPickUp(e.target.value);
  const handleDrop = (e) => setDropOff(e.target.value);
  const handlePickTime = (e) => setPickTime(e.target.value);
  const handleDropTime = (e) => setDropTime(e.target.value);

  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        <div onClick={openModal} className={`modal-overlay ${modal ? "active-modal" : ""}`}></div>

        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>

              <p className="error-message">
                All fields required! <i className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                You have successfully booked...You will receive a confirmation email shortly. <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label><i className="fa-solid fa-car"></i> &nbsp; Select Your Car Type</label>
                  <select value={carType} onChange={handleCar}>
                    <option>Select your car type</option>
                    {cars.map(car => (
                      <option key={car.id} value={car.name}>{car.name}</option>
                    ))}
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label><i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up</label>
                  <select value={pickUp} onChange={handlePick}>
                    <option>Select pick up location</option>
                    <option>Delhi</option>
                    <option>Kolkata</option>
                    <option>Bengaluru</option>
                    <option>Mumbai</option>
                    <option>Goa</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label><i className="fa-solid fa-location-dot"></i> &nbsp; Drop-off </label>
                  <select value={dropOff} onChange={handleDrop}>
                    <option>Select drop off location</option>
                    <option>Delhi</option>
                    <option>Kolkata</option>
                    <option>Bengaluru</option>
                    <option>Mumbai</option>
                    <option>Goa</option>
                  </select>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime"><i className="fa-regular fa-calendar-days "></i> &nbsp; Pick-up </label>
                  <input id="picktime" value={pickTime} onChange={handlePickTime} type="date"></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="droptime"><i className="fa-regular fa-calendar-days "></i> &nbsp; Drop-off </label>
                  <input id="droptime" value={dropTime} onChange={handleDropTime} type="date"></input>
                </div>
                
                <button className="searchbtn" onClick={openModal} type="submit">Search</button>
                
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        <div className="booking-modal__title">
          <h2>Complete Booking</h2>
          <i onClick={openModal} className="fa-solid fa-xmark"></i>
        </div>


        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Pick-Up Date & Time</h6>
                  <p>{pickTime} / <input type="time" className="input-time"></input></p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Drop-Off Date & Time</h6>
                  <p>{dropTime} / <input type="time" className="input-time"></input></p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Pick-Up Location</h6>
                  <p>{pickUp}</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Drop-Off Location</h6>
                  <p>{dropOff}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
            <h5><span>Car -</span> {carType}</h5>
            {carImg && <img src={`http://localhost:5000${carImg}`} alt="car_img" />}<br></br>
            <p>Price: ₹{carPrice} &nbsp;&nbsp; Seats: {carSeats} &nbsp;&nbsp;Fuel: {carFuel}</p>
          </div>
        </div>

        <div className="booking-modal__person-info">
          <h4>Personal Information</h4>
          <form className="info-form">
            <div className="info-form__2col">
              <span>
                <label>First Name <b>*</b></label>
                <input value={name} onChange={handleName} type="text" placeholder="Enter your first name"></input>
              
              </span>

              <span>
                <label>Last Name <b>*</b></label>
                <input value={lastName} onChange={handleLastName} type="text" placeholder="Enter your last name"></input>
               
              </span>

              <span>
                <label>Phone Number <b>*</b></label>
                <input value={phone} onChange={handlePhone} type="tel" placeholder="Enter your phone number"></input>
               
              </span>

              <span>
                <label>Age <b>*</b></label>
                <input value={age} onChange={handleAge} type="number" placeholder="18"></input>
               
              </span>
            </div>

            <div className="info-form__1col">
              <span>
                <label>Email <b>*</b></label>
                <input value={email} onChange={handleEmail} type="email" placeholder="Enter your email address"></input>
                
              </span>

              <span>
                <label>Address <b>*</b></label>
                <input value={address} onChange={handleAddress} type="text" placeholder="Enter your street address"></input>
               
              </span>
            </div>

            <div className="info-form__2col">
              <span>
                <label>City <b>*</b></label>
                <input value={city} onChange={handleCity} type="text" placeholder="Enter your city"></input>
               
              </span>

              <span>
                <label>Zip Code <b>*</b></label>
                <input value={zipcode} onChange={handleZip} type="text" placeholder="Enter your zip code"></input>
               
              </span>
            </div>

            <span className="info-form__checkbox">
              <input type="checkbox"></input>
              <p>Please send me latest news and updates</p>
            </span>

            <div className="reserve-button">
              <button onClick={confirmBooking}>Book Now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookCar;

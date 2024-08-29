import React, { useState } from 'react';
import axios from 'axios';
import './CarRegistration.css';

function CarRegistration() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [fuel, setFuel] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleSeatsChange = (e) => setSeats(e.target.value);
  const handleFuelChange = (e) => setFuel(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('seats', seats);
    formData.append('fuel', fuel);

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response.data);
        alert('Car registered successfully');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="car-registration">
      <h2>Register a New Car</h2>
      <form onSubmit={handleSubmit} className="car-registration-form">
        <div className="form-group">
          <label>Car Name</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <div className="form-group">
          <label>Car Image</label>
          <input type="file" onChange={handleImageChange} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" value={price} onChange={handlePriceChange} required />
        </div>
        <div className="form-group">
          <label>Seats</label>
          <input type="text" value={seats} onChange={handleSeatsChange} required />
        </div>
        <div className="form-group">
          <label>Fuel</label>
          <input type="text" value={fuel} onChange={handleFuelChange} required />
        </div>
        <button type="submit">Register Car</button>
      </form>
    </div>
  );
}

export default CarRegistration;

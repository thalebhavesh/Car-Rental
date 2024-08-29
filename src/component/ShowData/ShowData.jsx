import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowData.css';

function ShowData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="show-data">
      <h2>Booking Details</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Type</th>
            <th>Pick Up</th>
            <th>Drop Off</th>
            <th>Pick Time</th>
            <th>Drop Time</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Car Name</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Fuel</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.carType}</td>
              <td>{row.pickUp}</td>
              <td>{row.dropOff}</td>
              <td>{row.pickTime}</td>
              <td>{row.dropTime}</td>
              <td>{row.name}</td>
              <td>{row.lastName}</td>
              <td>{row.phone}</td>
              <td>{row.age}</td>
              <td>{row.email}</td>
              <td>{row.address}</td>
              <td>{row.city}</td>
              <td>{row.zipcode}</td>
              <td>{row.carName}</td>
              <td>{row.price}</td>
              <td>{row.seats}</td>
              <td>{row.fuel}</td>
              <td><img src={`http://localhost:5000${row.imagePath}`} alt="Car" width="100" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowData;

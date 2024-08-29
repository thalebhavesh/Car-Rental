// CarouselComponent.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import './CarouselComponent.css';

function CarouselComponent() {
  return (
    <div>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carbanner1.png"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel> 
    </div>

    
  );
}
export default CarouselComponent;

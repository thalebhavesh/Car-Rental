import React from 'react'
import CarouselComponent from '../component/Carousels/CarouselComponent'
import BookCar from '../component/BookCars/BookCar'
import PlanTrip from '../component/PlanTrip/PlanTrip'
import Footer from '../component/footer/Footer'

export default function Home() {
  return (
    <>
    <CarouselComponent />
    <BookCar/>
    <PlanTrip/>
    <Footer/>
    </>
  )
}

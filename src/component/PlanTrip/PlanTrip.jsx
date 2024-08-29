import React from 'react'
import './PlanTrip.css';

function PlanTrip() {
    return (
        <div>
        <section className="plan-section">
        <div className="container">
          <div className="plan-container">
            <div className="plan-container__title">
              <h3>Plan your trip now</h3>
              <h2><b>Quick & easy car rental</b></h2>
            </div>

            <div className="plan-container__boxes">
              <div className="plan-container__boxes__box">
                <img src="/icons/icon1.png" alt="icon_img" />
                <h3>Select Car</h3>
                <p>
                  We offers a big range of vehicles for all your driving needs.
                  We have the perfect car to meet your needs
                </p>
              </div>

              <div className="plan-container__boxes__box">
                <img src="/icons/icon2.png" alt="icon_img" />
                <h3>Contact Operator</h3>
                <p>
                  Our knowledgeable and friendly operators are always ready to
                  help with any questions or concerns
                </p>
              </div>

              <div className="plan-container__boxes__box">
                <img src="/icons/icon3.png"  alt="icon_img"/>
                <h3>Let's Drive</h3>
                <p>
                  Whether you're hitting the open road, we've got you covered
                  with our wide range of cars
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
       <div className="banner">
       <h1>Save big with our cheap car rental!</h1>
       <p>Top Airports. Local Suppliers. <span className="highlight">24/7 Support.</span></p>
     </div>
     </div>
    )
}

export default PlanTrip;

import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import ParallaxImg from '../../assets/images/parallax.jpg';
import { TripBookingContainer } from './styled';
import BookingForm from './BookingForm';

class TripBooking extends Component {
  render() {
    return (
      <section className="trip-booking">
        <Parallax
          bgImage={ParallaxImg}
          bgImageAlt="trip booking"
          strength={700}
        >
          <TripBookingContainer>
            <div className="container">
              <BookingForm atHome />
            </div>
          </TripBookingContainer>
        </Parallax>
      </section>
    );
  }
}

export default TripBooking;

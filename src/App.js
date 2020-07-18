import React from 'react';
import EditProfile from './containers/Profile/EditProfile';
import MyProfile from './containers/Profile/MyProfile';
import HomePage from './containers/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchTrip from './containers/Search';
import BookingTrip from './containers/BookingTrip';
import HistoryTrips from './containers/HistoryTrip';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import NotFound from './containers/NotFound';
import ScrollToTop from 'react-router-scroll-top';

if (localStorage && localStorage.getItem('auth')) {
  const decoded = jwtDecode(localStorage.getItem('auth'));
  if (Date.now() / 1000 <= decoded.exp) {
    axios.defaults.headers.common['token'] = localStorage.getItem('auth');
  }
}

const App = (props) => {
  const { auth } = props;
  const { authenticate } = auth;

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/trips/search" component={SearchTrip} />
            <Route path="/booking-trip/:id" component={BookingTrip} />
            <Route
              path="/edit-profile"
              exact
              component={authenticate ? EditProfile : NotFound}
            />
            <Route path="/history-trips" exact component={HistoryTrips} />
            <Route path="/driver-profile/:id" component={MyProfile} />
            <Route
              path="/my-profile"
              component={authenticate ? MyProfile : NotFound}
            />
            <Route path="/" component={NotFound} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.Authenticate,
  };
};

export default connect(mapStateToProps, null)(App);

import { combineReducers } from 'redux';
import { Trips } from './Trip/reducer';
import { SearchTrips } from './SearchTrip/reducer';
import { HistoryTrips } from './HistoryTrip/reducer';
import { Authenticate } from './Auth/reducer';
import { Provinces } from './Province/reducer';
import { TripDetail } from './TripDetail/reducer';
import { BookingTrips } from './BookingTrip/reducer';
import { UserInfo } from './User/reducer';
import { Cars } from './Car/reducer';
import { CountTrip } from './CountTrip/reducer';
import { CountSearchTrip } from './CountSearchTrip/reducer';

export const rootReducers = combineReducers({
    Trips,
    Authenticate,
    Provinces,
    UserInfo,
    Cars,
    SearchTrips,
    BookingTrips,
    HistoryTrips,
    TripDetail,
    CountTrip,
    CountSearchTrip
});

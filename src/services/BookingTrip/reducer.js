import { BOOKING_TRIPS } from './actionTypes';

let initialState = {};

export const BookingTrips = (state = initialState, action) => {
    switch (action.type) {
        case BOOKING_TRIPS:
            return action.payload;
        default:
            return state;
    }
};

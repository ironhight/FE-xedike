import { BOOKING_TRIPS } from './actionTypes';
import apiCaller from '../../utils/apiCaller';

export const bookingTrip = (id, values, callbackThen, callbackCatch) => {
  return (dispatch) => {
    return apiCaller(`trips/booking-trip/${id}`, 'PUT', values)
      .then((res) => {
        dispatch({
          type: BOOKING_TRIPS,
          payload: res.data,
        });
        callbackThen();
      })
      .catch(() => {
        callbackCatch();
      });
  };
};
